import { CalendarIcon } from "@heroicons/react/24/outline";
import { uk } from "date-fns/locale";
import { forwardRef, LegacyRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DragDropList from "./DragDropList/DragDropList";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetch-api";

const Trigger = forwardRef(({ value, onClick }: any, ref: LegacyRef<HTMLButtonElement>) => (
  <button
    onClick={onClick}
    ref={ref}
    className="input input-bordered flex justify-between items-center gap-2 w-full cursor-pointer"
  >
    <div className="text-xl font-medium">{value}</div>
    <CalendarIcon className="w-6 h-6" />
  </button>
));

export default function SingleShedule() {
  const { sheduleId } = useParams();
  const isCreateMode = sheduleId === "create";
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [initialShedule, setInitialShedule] = useState(null);
  // const [items, setItems] = useState([]);

  useEffect(() => {
    if (isCreateMode) return;

    fetchAPI("/currentBandLists/" + sheduleId, {
      populate: ["songs", "band"],
      sort: { date: "desc" },
    }).then((data) => {
      setInitialShedule(data.data);
    });
  }, []);

  function setItems(items) {
    setInitialShedule((prev) => ({
      ...prev,
      songs: items,
    }));
  }

  if (!initialShedule) return null;

  return (
    <div className="Bridge">
      <div className="mb-4">
        <DatePicker
          selected={initialShedule.date || selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)} // Single date
          locale={uk}
          dateFormat="dd/MM/yyyy"
          customInput={<Trigger />}
        />
      </div>
      <div>
        <DragDropList items={initialShedule?.songs || []} setItems={setItems} />
      </div>
    </div>
  );
}
