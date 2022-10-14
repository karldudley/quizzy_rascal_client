import React from 'react'

const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map((option, idx) => (
                <option key={idx} data-testid='option' value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};

export default Dropdown;
