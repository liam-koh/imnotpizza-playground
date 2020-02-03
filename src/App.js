import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from "./components/ex1.js"


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Square value={10}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
