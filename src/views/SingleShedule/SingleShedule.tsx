import { CalendarIcon, CheckIcon } from "@heroicons/react/24/outline";
import { uk } from "date-fns/locale";
import { forwardRef, LegacyRef, useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DragDropList from "./DragDropList/DragDropList";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";
import { format } from "date-fns";
import { Routes } from "../../constants/routes";
import { formatDate } from "../../utils/utils";
import ReactDOM from "react-dom";

const EMPTY_SHEDULE = {
  date: "",
  songs: [],
};

const Trigger = forwardRef(
  ({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement>) => (
    <button
      onClick={onClick}
      ref={ref}
      className="input input-bordered flex justify-between items-center gap-2 w-full cursor-pointer"
    >
      {value && (
        <div className="text-xl font-medium">
          {formatDate(value.replace("/", "-"))}
        </div>
      )}
      {!value && <div className="text-xl text-placeholder">Оберіть дату</div>}
      <CalendarIcon className="w-6 h-6" />
    </button>
  )
);

export default function SingleShedule() {
  const { sheduleId } = useParams();
  const navigate = useNavigate();
  const isCreateMode = sheduleId === "create";
  const [initialShedule, setInitialShedule] = useState(null);
  const [shedule, setShedule] = useState(null);

  console.log("shedule", shedule);

  const sheduleChanged =
    JSON.stringify(shedule) !== JSON.stringify(initialShedule);

  useEffect(() => {
    if (isCreateMode) {
      setInitialShedule(EMPTY_SHEDULE);
      setShedule(JSON.parse(JSON.stringify(EMPTY_SHEDULE))); // deep copy of EMPTY_SHEDULE
      return;
    }

    fetchAPI("/currentBandLists/" + sheduleId, {
      populate: ["songs"],
    }).then((data) => {
      setShedule(data.data);
      setInitialShedule(JSON.parse(JSON.stringify(data.data))); // deep copy of data.data;
    });
  }, []);

  const addItem = useCallback((newItem) => {
    setShedule((prev) => ({
      ...prev,
      songs: [...prev.songs, newItem],
    }));
  }, []);

  const setItems = useCallback((items) => {
    setShedule((prev) => ({
      ...prev,
      songs: items,
    }));
  }, []);

  const setDate = useCallback((date) => {
    setShedule((prev) => ({
      ...prev,
      date: format(date, "yyyy-MM-dd"), // to be consistent (api support any type of date)
    }));
  }, []);

  async function saveShedule() {
    const data = await fetchAPI(
      isCreateMode ? "/currentBandLists" : `/currentBandLists/${sheduleId}`,
      {},
      {
        method: isCreateMode ? "POST" : "PUT",
        body: JSON.stringify({
          data: shedule,
        }),
      }
    );

    setInitialShedule(JSON.parse(JSON.stringify(shedule)));

    if (isCreateMode && data) {
      navigate(`${Routes.BandShedule}/${data.data.id}`);
    }
  }

  if (!shedule) return null;

  return (
    <>
      <div className="Bridge">
        <div className="mb-4">
          <DatePicker
            selected={shedule?.date ?? null}
            onChange={setDate} // Single date
            locale={uk}
            dateFormat="yyyy-MM-dd"
            customInput={<Trigger />}
            placeholderText="Оберіть дату"
          />
        </div>
        <div>
          <DragDropList
            items={shedule?.songs || []}
            setItems={setItems}
            addItem={addItem}
          />
        </div>
      </div>
      {sheduleChanged && <SavingButton saveShedule={saveShedule} />}
    </>
  );
}

function SavingButton({ saveShedule }) {
  return ReactDOM.createPortal(
    <div className="fixed bottom-4 left-4">
      <button
        className="btn btn-square bg-base-300 ring-neutral ring-1"
        onClick={saveShedule}
      >
        <CheckIcon className="w-6 h-6" />
      </button>
    </div>, document.body
  );
}
