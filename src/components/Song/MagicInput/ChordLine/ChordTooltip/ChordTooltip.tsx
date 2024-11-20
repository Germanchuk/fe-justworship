import { useEffect, useState } from "react";
import "./ChordTooltip.css";
import getChordImg from "../../../../../utils/getChordImg";

const ChordTooltip = ({ children, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="ChordTooltip__wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="ChordTooltip shadow-xl bg-base-100 rounded ring-1 ring-base-300">
          <ChordContent chordName={children} />
        </div>
      )}
    </span>
  );
};

function ChordContent({ chordName }) {
  const [src, setSrc] = useState();
  useEffect(() => {
    getChordImg(chordName).then((data) => {
      setSrc(data);
    });
  }, []);

  return (
    <div>
      {src ? (
        <div className="w-72">
          <img className="w-full" alt="chord" src={src} />
        </div>
      ) : (
        <div className="w-72 h-44 flex justify-center items-center"><span className="loading loading-ring loading-xl"></span></div>
      )}
    </div>
  );
}

export default ChordTooltip;
