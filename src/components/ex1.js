import React from 'react';

class Square extends React.Component {
    render(){
        return(
            <div>

                <div>
                    <h1>REACT TEST</h1>
                </div>
                <button className="square">
                    {this.props.value}
                </button>
                
            </div>
        )
    }
}




export default Square