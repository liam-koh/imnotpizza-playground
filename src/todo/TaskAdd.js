import React, { Component } from "react";

const TaskAdd = ({ value, changeHandler, clickHandler }) => {
  return (
    <form className="field has-addons">
      <div>
        <input className="input" value={value} onChange={changeHandler}></input>
      </div>
      <div>
        <button className="button is-primary" onClick={clickHandler}>저장</button>
      </div>
    </form>
  );
};

export default TaskAdd;
