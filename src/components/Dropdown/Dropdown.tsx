import React, {useState, useRef, useEffect, CSSProperties} from "react";

const Dropdown = ({
  trigger,
  children,
  position = "bottom",
  className = "w-60",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const style: CSSProperties = {
    position: "absolute",
    right: 0,
    zIndex: 1
  };

  style.top = position === "bottom" ? "100%" : "-8px";
  style.transform = position === "bootom" ? "" : "translateY(-100%)"

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Додаємо обробник події кліку по документу
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Видаляємо обробник при демонтажі компонента
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={handleToggle}>{trigger(isOpen)}</div>
      {isOpen && (
        <div
          className={className}
          style={style}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
