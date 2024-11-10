import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div onClick={handleToggle}>{trigger(isOpen)}</div>
      {isOpen && (
        <div
          className="w-60"
          style={{ position: "absolute", top: "100%", right: 0, zIndex: 1 }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
