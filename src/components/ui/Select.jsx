import React from 'react';
import './Input.css'; // Reusing some base styles

const Select = ({ label, id, options, value, onChange, placeholder, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      <select
        id={id}
        className="input"
        value={value}
        onChange={onChange}
        {...props}
      >
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
