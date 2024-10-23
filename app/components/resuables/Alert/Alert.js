// Alert.jsx
import React from 'react';

const Alert = ({ type, icon, title, message, onClose }) => {
  const alertClasses = `alert fade alert-simple alert-${type} alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light`;
  
  return (
    <div className={alertClasses} role="alert">
      <button type="button" className="close font__size-18" onClick={onClose}>
        <span aria-hidden="true"><i className={`fa fa-times ${type}-cross`}></i></span>
        <span className="sr-only">Close</span>
      </button>
      <i className={`start-icon ${icon} faa-${type === 'success' ? 'tada' : 'shake'} animated`}></i>
      <strong className="font__weight-semibold">{title}</strong> {message}
    </div>
  );
};

export default Alert;
