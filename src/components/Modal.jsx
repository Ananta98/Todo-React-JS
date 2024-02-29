import React from "react";

const Modal = ({title, open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/80" : "invisible"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        } max-h-full w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            class="top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
