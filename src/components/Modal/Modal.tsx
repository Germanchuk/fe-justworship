import React from "react";

export default function Modal({ trigger, content, title }: any) {
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
          <form method="dialog" className="flex justify-between items-center">
            {/* if there is a button in form, it will close the modal */}
            {title && (<h4 className="text-lg">{title}</h4>)}
            <button className="btn btn-sm btn-circle btn-ghost">
              <CloseIcon />
            </button>
          </form>
          <div className="pt-4">
            {content}
          </div>
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
