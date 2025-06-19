import Modal from "../../Modal/Modal.tsx";
import {songApi} from "../../../api";
import {Routes} from "../../../constants/routes.ts";
import {addNotificationWithTimeout} from "../../../redux/slices/notificationsSlice.ts";
import {useDispatch} from "react-redux";
import {useEditMode, useSong} from "../../../hooks/song/selectors.ts";
import {useNavigate} from "react-router-dom";

const Trigger = (props) => {
  return (
    <button className="btn btn-outline bg-delete-base text-delete-content ring-delete-content" {...props}>
      Видалити пісню
    </button>
  )
}

const Content = () => {
  const dispatch = useDispatch();
  const song = useSong();
  console.log(song);
  const navigate = useNavigate();

  const deleteSong = async () => {
    songApi.deleteSong(song.id, song).then(() => {
      navigate(Routes.BandSongs);
    })
      .catch(() => {
        dispatch(addNotificationWithTimeout({
          type: "error",
          message: "Помилка серверу, не вдалось видалити пісню",
        }));
      });
  }
  return (
    <div className="flex justify-end gap-2">
      <button className={"btn bg-delete-base text-delete-content"} onClick={deleteSong}>Так</button>
      <form method="dialog">
        <button className={"btn"}>Ні</button>
      </form>
    </div>
  )
}

export default function DeleteSong() {
  const editMode = useEditMode();
  if (!editMode) return;
  return (
    <Modal
      trigger={<Trigger />}
      title={"Дійсно видалити пісню?"}
      content={<Content />}
    />
  )
}