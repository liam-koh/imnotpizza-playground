import React from "react";

// const Person = (props) => (
//     <div>
//         <h1>컴포넌트 props : {props.name}, age : {props.age}</h1>
//     </div>
// )

// export default Person

class Person extends React.Component {
  render() {
    //const {name, age}=this.props; props의 name, age 할당 

    return (
      <div>
        <h1>
          props : {this.props.name} age : {this.props.age}
        </h1>
        <h2>{this.props.children}</h2>
        <h3>{this.props.myfun}</h3>
      </div>
    );
  }
}

export default Person;
