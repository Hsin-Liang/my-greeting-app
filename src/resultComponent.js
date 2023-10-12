// ResultComponent.js
import React from 'react';

function resultComponent({ result }) {
    return result && <div className="centered-text">BMI: {result}</div>;
}

export default resultComponent;
