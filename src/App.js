import React from 'react';
import logo from './logo.svg';
import './App.css';
import Square from "./components/ex1.js"
import Person from "./components/Person.js"

import Button from "./components/Button"
import Display from "./components/Display"

/**
 * props : 하위컴포넌트로 전달하는 값, vue의 v-bind=props와 동일
 * state : 컴포넌트에서 내부적으로 처리하는 변수 저장, vue 의 data와 동일
 * props : 부모에서 사용된 태그 내의 값을 전달, vue의 slot?? 과 동일
 * 
 * 
 * 
 */
// class App extends React.Component {
  
//   state={
//     person:[
//       {id: 1, name: "name1"},
//       {id: 2, name: "name2"},
//       {id: 3, name: "name3"},
//       {id: 4, name: "name4"},
//       {id: 5, name: "name5"},
//     ]
//   }

//   render(){

//     const myfun= ()=>{ "testone" };


//     return (
//       <div className="App">
//       <header className="App-header">
//         <div>
//           <Square value={10}></Square>
//           <Person name={"name1"} age={26} myfun={myfun}>
//             <div>from props to children</div>
//           </Person>
//           <Person name={"name2"} age={36}></Person>
//           <Person name={"name3"} age={46}></Person>
//         </div>
//       </header>
//     </div>
//     )
//   }

  
// }
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      number: 0,
    }

    //this.onClickHandler=this.onClickHandler.bind(this)//react의 this를 함수내로 바인딩, 
    //애로우 함수 사용시 this.를 react 객체로 그대로 사용하기 때문에 필요없음
  }
  onClickHandler = (num) => {
    console.log("click")
    //this.state.number++;//setState를 사용하여야 가능
    this.setState({ number: this.state.number + num})
  }


  render(){

    return(
      <div className="App">
        <Display value={this.state.number}></Display>
        <Button clickHandler={()=>this.onClickHandler(1)}>버튼 컴포넌트 증가</Button>
        <Button clickHandler={()=>this.onClickHandler(-1)}>버튼 컴포넌트 감소</Button>

        <button onClick={()=>this.onClickHandler(1)}>증가</button>
        <button onClick={()=>this.onClickHandler(-1)}>감소</button>
      </div>
    );
  }
}

// //버튼 컴포넌트
// const Button = ({children, clickHandler}) =>
//   <div>
//     <button onClick={clickHandler}>{children}</button>
//   </div>

// //값 표시 컴포넌트
// const Display = ({value}) =>
//   <div>
//     <h1>{value}</h1>
//   </div>

export default App;
