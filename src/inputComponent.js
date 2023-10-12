// InputComponent.js
import React from 'react';

function inputComponent({ value, onChange, placeholder }) {
    return (
        <div>
            <input
                className="centered-input"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <p />
        </div>
    );
}

export default inputComponent;
