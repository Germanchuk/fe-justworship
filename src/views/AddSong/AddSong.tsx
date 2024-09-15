import React from "react";
import Modal from "../../components/Modal/Modal";
import HolychordsModalContent from "./Holychords/HolychordsModalContent";

export default function AddSong() {
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
        />
        <button className="btn btn-disabled">Вставити текст</button>
        <button className="btn">Створити в редакторі</button>
      </div>
    </>
  );
}
