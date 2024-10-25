// /components/Modal.js

import { X } from 'lucide-react';
import React from 'react';

const Modal = ({ isOpen, onClose, title, children, onSubmit }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X/>
        </button>
        {title && (
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
        )}
        {onSubmit ? (
          <form onSubmit={onSubmit}>
            {children}
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600 mt-4"
            >
              Submit
            </button>
          </form>
        ) : (
          <div>{children}</div> // Corrected this line to properly render children
        )}
      </div>
    </div>
  );
};

export default Modal;
