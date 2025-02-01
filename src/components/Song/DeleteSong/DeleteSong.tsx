import Modal from "../../Modal/Modal.tsx";

const Trigger = (props) => {
  return (
    <button className="btn btn-outline bg-delete-base text-delete-content ring-delete-content" {...props}>
      Видалити пісню
    </button>
  )
}

const Content = ({ onDelete }) => {
  return (
    <div className="flex justify-end gap-2">
      <button className={"btn bg-delete-base text-delete-content"} onClick={onDelete}>Так</button>
      <form method="dialog">
        <button className={"btn"}>Ні</button>
      </form>
    </div>
  )
}

export default function DeleteSong({ deleteSong }) {
  return (
    <Modal
      trigger={<Trigger />}
      title={"Дійсно видалити пісню?"}
      content={<Content onDelete={deleteSong} />}
    />
  )
}