import Modal from "../../components/Modal/Modal";
import { Routes } from "../../constants/routes";
import HolychordsModalContent from "./Holychords/HolychordsModalContent";
import { Link } from "react-router-dom";

export default function CreateSong() {
  return (
    <>
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-3xl font-bold tracking-tight">Додавання пісні</h1>
        {/* <Link className="btn btn-square" to="/mySongs/add">
          <AddIcon />
        </Link> */}
      </div>
      <div className="flex items-center gap-4 flex-col">
        <Modal
          trigger={<button className="btn">Імпортувати з Holychords</button>}
          content={<HolychordsModalContent />}
          title={"Імпортувати з Holychords"}
        />
        {/*<Link to={Routes.AddSongTextToSong}>*/}
        {/*  <button className="btn btn-disabled">Вставити текст</button>*/}
        {/*</Link>*/}
        <Link to={Routes.AddSongFromScratch}>
          <button className="btn">Створити в редакторі</button>
        </Link>
      </div>
    </>
  );
}
