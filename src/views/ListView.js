import React from "react";
import {
    TextField,
    Button,
} from "@material-ui/core"

class ListView extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          radioGroup: {
            angular: false,
            react: true,
            polymer: false
          },
          checkboxGroup: {
            node: false,
            react: true,
            express: false,
            mongodb: false
          },
          selectedValue: "node"
        };
    }

    handleRadio=(ev)=>{
        let obj={};
        obj[ev.target.value]=ev.target.checked;
        this.setState({radioGroup: obj})
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <h2>radio test</h2>
                    <input type="radio"></input> 
                </form>
            </div>
        )
    }

   
}

export default ListView;
  