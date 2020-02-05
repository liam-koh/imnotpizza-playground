import React, { Component } from "react";
import TaskAdd from "./todo/TaskAdd";
import TaskDisplay from "./todo/TaskDisplay";

class App extends Component {
  state = {
    tasks: [],
    task: ""
  };

  //버튼클릭 이벤트
  onClickHandler = e => {
    e.preventDefault();

    const _task = { todo: this.state.task };

    this.setState({
      tasks: [...this.state.tasks, _task],
      task: ""
    });

    console.log("click");
  };

  //추가 이벤트
  onChangeHandler = e => {
    this.setState({
      task: e.target.value
    });

    console.log("changed");
  };

  //삭제 이벤트
  deleteHandler = idx => {
    const _tasks = this.state.tasks.filter((task, i) => i !== idx);
    this.setState({ tasks: _tasks });
  };

  //메인
  render() {
    return (
      <div className="container">
        <div>
          <TaskAdd
            value={this.state.task}
            changeHandler={this.onChangeHandler}
            clickHandler={this.onClickHandler}
          ></TaskAdd>
        </div>
        <TaskDisplay
          tasks={this.state.tasks}
          deleteHandler={this.deleteHandler}
        ></TaskDisplay>
      </div>
    );
  }
}

export default App;
