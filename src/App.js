import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from "./components/ex1.js"
import Person from "./components/Person.js"

/**
 * props : 하위컴포넌트로 전달하는 값, vue와 동일
 * state : 
 * 
 * 
 */
class App extends React.Component {
  


  render(){
    return (
      <div className="App">
      <header className="App-header">
        <div>
          <Square value={10}></Square>
          <Person name={"name1"} age={26}></Person>
          <Person name={"name2"} age={36}></Person>
          <Person name={"name3"} age={46}></Person>
        </div>
      </header>
    </div>
    )
  }

  
  
}

export default App;
