import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`card ${className}`}>
    {children}
  </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, className = '', ...props }) => (
  <div className={`input-group ${className}`}>
    {label && <label>{label}</label>}
    <input className="input-field" {...props} />
  </div>
);

export const Select = ({ label, options, className = '', ...props }) => (
    <div className={`input-group ${className}`}>
      {label && <label>{label}</label>}
      <select className="input-field" {...props}>
          {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
          ))}
      </select>
    </div>
);

export const Table = ({ headers, children, className = '' }) => (
  <div className={`table-container ${className}`}>
    <table className="data-table">
      <thead>
        <tr>
          {headers.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
);

export const Badge = ({ children, type = 'default' }) => (
  <span className={`badge badge-${type.toLowerCase()}`}>
    {children}
  </span>
);
