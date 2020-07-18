import React from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Home from './components/layout/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Home/>
      </header>
    </div>
  );
}

export default App;
