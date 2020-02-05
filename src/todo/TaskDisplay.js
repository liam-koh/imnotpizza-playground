import React, { Component } from "react";

const TaskDisplay = ({ tasks, deleteHandler }) => {
  return tasks.map((task, index) => {
    return (
      <div key={index}>
        <p>{task.todo}</p>
        {/* 이벤트로 함수를 반환시켜 초기실행 방지 */}
        <button onClick={() => deleteHandler(index)}>삭제</button>
      </div>
    );
  });
};

export default TaskDisplay;
