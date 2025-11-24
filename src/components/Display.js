import React from 'react';

function Display({ value, expression, memory, angleMode }) {
    return (
        <div className="display">
            <div className="display-info">
                <span className="angle-mode">{angleMode}</span>
                {memory !== 0 && <span className="memory-indicator">M</span>}
            </div>
            <div className="display-expression">{expression || '\u00A0'}</div>
            <div className="display-value">{value}</div>
        </div>
    );
}

export default Display;
