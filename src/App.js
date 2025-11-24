import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <h1 className="app-title">Scientific Calculator</h1>
        <Calculator />
        <p className="app-footer">Built with React • Keyboard Supported</p>
      </div>
    </div>
  );
}

export default App;
