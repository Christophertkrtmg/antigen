import React from "react";
import ButtonComponent from "../buttons/button";

export default function ModalComponent({ hide, children, title }) {
  return (
    <div
      className={className.main}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className={className.container}>
        <div
          className={className.opacity}
          aria-hidden="true"
          onClick={hide}
        ></div>
        <span className={className.center} aria-hidden="true">
          &#8203;
        </span>
        <div className={className.modal}>
          <div className="p-3">
            <h3 className={className.title} id="modal-title">
              {title}
            </h3>
          </div>
          <div className={className.modalBody}>
            <div className="text-center sm:mt-0 sm:mx-5 sm:text-left">
              <div className="w-full pt-3">{children}</div>
            </div>
          </div>
          <div className={className.modalFooter}>
            <ButtonComponent
              title="Close"
              onClick={hide}
              color="bg-red-600"
              hoverColor="bg-red-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const className = {
  main: "fixed z-20 inset-0 overflow-y-auto",
  center: "hidden sm:inline-block sm:align-middle sm:h-screen",
  container:
    "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ",
  opacity: "fixed inset-0  bg-black bg-opacity-75 transition-opacity",
  modal:
    "inline-block align-bottom  bg-white dark:bg-gray-200  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
  title: "text-lg leading-6 font-medium text-gray-900 border-b-2 pb-3",
  modalBody: "bg-white px-4 dark:bg-gray-200 pb-4 sm:p-2 sm:pb-4",
  modalFooter:
    "bg-gray-50 border-t-2 dark:bg-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse",
};
