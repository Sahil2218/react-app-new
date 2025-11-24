import React from 'react';

function ButtonGrid({
    onNumber,
    onOperation,
    onEquals,
    onClear,
    onBackspace,
    onDecimal,
    onScientific,
    onConstant,
    onMemory,
    onToggleAngle,
    angleMode
}) {
    const Button = ({ label, onClick, className = '', span = 1 }) => (
        <button
            className={`calc-button ${className}`}
            onClick={onClick}
            style={span > 1 ? { gridColumn: `span ${span}` } : {}}
        >
            {label}
        </button>
    );

    return (
        <div className="button-grid">
            {/* Row 1: Memory and Clear */}
            <Button label="MC" onClick={() => onMemory('MC')} className="function" />
            <Button label="MR" onClick={() => onMemory('MR')} className="function" />
            <Button label="M+" onClick={() => onMemory('M+')} className="function" />
            <Button label="M-" onClick={() => onMemory('M-')} className="function" />
            <Button label="C" onClick={onClear} className="clear" />
            <Button label="⌫" onClick={onBackspace} className="function" />

            {/* Row 2: Scientific Functions */}
            <Button label={angleMode} onClick={onToggleAngle} className="function" />
            <Button label="sin" onClick={() => onScientific('sin')} className="scientific" />
            <Button label="cos" onClick={() => onScientific('cos')} className="scientific" />
            <Button label="tan" onClick={() => onScientific('tan')} className="scientific" />
            <Button label="x²" onClick={() => onScientific('square')} className="scientific" />
            <Button label="x³" onClick={() => onScientific('cube')} className="scientific" />

            {/* Row 3: More Scientific Functions */}
            <Button label="√" onClick={() => onScientific('sqrt')} className="scientific" />
            <Button label="log" onClick={() => onScientific('log')} className="scientific" />
            <Button label="ln" onClick={() => onScientific('ln')} className="scientific" />
            <Button label="x!" onClick={() => onScientific('factorial')} className="scientific" />
            <Button label="1/x" onClick={() => onScientific('inverse')} className="scientific" />
            <Button label="eˣ" onClick={() => onScientific('exp')} className="scientific" />

            {/* Row 4: Constants and Numbers */}
            <Button label="π" onClick={() => onConstant('pi')} className="constant" />
            <Button label="e" onClick={() => onConstant('e')} className="constant" />
            <Button label="7" onClick={() => onNumber('7')} className="number" />
            <Button label="8" onClick={() => onNumber('8')} className="number" />
            <Button label="9" onClick={() => onNumber('9')} className="number" />
            <Button label="÷" onClick={() => onOperation('/')} className="operator" />

            {/* Row 5 */}
            <Button label="|x|" onClick={() => onScientific('abs')} className="scientific" />
            <Button label="±" onClick={() => onScientific('negate')} className="scientific" />
            <Button label="4" onClick={() => onNumber('4')} className="number" />
            <Button label="5" onClick={() => onNumber('5')} className="number" />
            <Button label="6" onClick={() => onNumber('6')} className="number" />
            <Button label="×" onClick={() => onOperation('*')} className="operator" />

            {/* Row 6 */}
            <Button label="(" onClick={() => { }} className="function disabled" />
            <Button label=")" onClick={() => { }} className="function disabled" />
            <Button label="1" onClick={() => onNumber('1')} className="number" />
            <Button label="2" onClick={() => onNumber('2')} className="number" />
            <Button label="3" onClick={() => onNumber('3')} className="number" />
            <Button label="-" onClick={() => onOperation('-')} className="operator" />

            {/* Row 7 */}
            <Button label="xʸ" onClick={() => onOperation('^')} className="scientific" />
            <Button label="0" onClick={() => onNumber('0')} className="number" span={2} />
            <Button label="." onClick={onDecimal} className="number" />
            <Button label="+" onClick={() => onOperation('+')} className="operator" />

            {/* Row 8 */}
            <Button label="=" onClick={onEquals} className="equals" span={6} />
        </div>
    );
}

export default ButtonGrid;
