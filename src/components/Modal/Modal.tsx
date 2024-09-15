import React from "react";

export default function Modal({ trigger, content }: any) {
  const ref = React.useRef(null);
  return (
    <>
      {React.cloneElement(trigger, {
        onClick: (e) => {
          if (trigger.props.onClick) {
            trigger.props.onClick(e);
          }

          ref.current?.showModal();
        },
      })}

      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <CloseIcon />
            </button>
          </form>
          {content}
        </div>
      </dialog>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}
