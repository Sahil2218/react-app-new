import React, { useState, useEffect } from 'react';
import Display from './Display';
import ButtonGrid from './ButtonGrid';
import './Calculator.css';

function Calculator() {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [memory, setMemory] = useState(0);
    const [angleMode, setAngleMode] = useState('DEG'); // DEG or RAD
    const [expression, setExpression] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key >= '0' && e.key <= '9') {
                handleNumber(e.key);
            } else if (e.key === '.') {
                handleDecimal();
            } else if (['+', '-', '*', '/'].includes(e.key)) {
                handleOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                handleEquals();
            } else if (e.key === 'Escape') {
                handleClear();
            } else if (e.key === 'Backspace') {
                handleBackspace();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [display, previousValue, operation, waitingForOperand]);

    const handleNumber = (num) => {
        if (waitingForOperand) {
            setDisplay(String(num));
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const handleDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const handleOperation = (nextOperation) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
            setExpression(`${inputValue} ${nextOperation}`);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = performOperation(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
            setExpression(`${newValue} ${nextOperation}`);
        }

        setWaitingForOperand(true);
        setOperation(nextOperation);
    };

    const performOperation = (firstValue, secondValue, operation) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            case '^':
                return Math.pow(firstValue, secondValue);
            default:
                return secondValue;
        }
    };

    const handleEquals = () => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = performOperation(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setExpression('');
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
        setExpression('');
    };

    const handleBackspace = () => {
        if (!waitingForOperand) {
            const newDisplay = display.slice(0, -1);
            setDisplay(newDisplay || '0');
        }
    };

    const handleScientific = (func) => {
        const value = parseFloat(display);
        let result;

        switch (func) {
            case 'sin':
                result = angleMode === 'DEG' ? Math.sin(value * Math.PI / 180) : Math.sin(value);
                break;
            case 'cos':
                result = angleMode === 'DEG' ? Math.cos(value * Math.PI / 180) : Math.cos(value);
                break;
            case 'tan':
                result = angleMode === 'DEG' ? Math.tan(value * Math.PI / 180) : Math.tan(value);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'square':
                result = value * value;
                break;
            case 'cube':
                result = value * value * value;
                break;
            case 'factorial':
                result = factorial(value);
                break;
            case 'inverse':
                result = 1 / value;
                break;
            case 'exp':
                result = Math.exp(value);
                break;
            case 'abs':
                result = Math.abs(value);
                break;
            case 'negate':
                result = -value;
                break;
            default:
                return;
        }

        setDisplay(String(result));
        setWaitingForOperand(true);
    };

    const factorial = (n) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    const handleConstant = (constant) => {
        switch (constant) {
            case 'pi':
                setDisplay(String(Math.PI));
                break;
            case 'e':
                setDisplay(String(Math.E));
                break;
            default:
                break;
        }
        setWaitingForOperand(true);
    };

    const handleMemory = (action) => {
        const value = parseFloat(display);
        switch (action) {
            case 'MC':
                setMemory(0);
                break;
            case 'MR':
                setDisplay(String(memory));
                setWaitingForOperand(true);
                break;
            case 'M+':
                setMemory(memory + value);
                setWaitingForOperand(true);
                break;
            case 'M-':
                setMemory(memory - value);
                setWaitingForOperand(true);
                break;
            default:
                break;
        }
    };

    const toggleAngleMode = () => {
        setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG');
    };

    return (
        <div className="calculator">
            <Display
                value={display}
                expression={expression}
                memory={memory}
                angleMode={angleMode}
            />
            <ButtonGrid
                onNumber={handleNumber}
                onOperation={handleOperation}
                onEquals={handleEquals}
                onClear={handleClear}
                onBackspace={handleBackspace}
                onDecimal={handleDecimal}
                onScientific={handleScientific}
                onConstant={handleConstant}
                onMemory={handleMemory}
                onToggleAngle={toggleAngleMode}
                angleMode={angleMode}
            />
        </div>
    );
}

export default Calculator;
