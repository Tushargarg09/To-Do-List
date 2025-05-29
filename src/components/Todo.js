import React from 'react';

export const Todo = ({ task, toggleComplete, deleteTodo }) => {
  return (
    <div className="Todo">
      <p
        onClick={() => toggleComplete(task.id)}
        className={task.completed ? 'completed' : 'incompleted'}
      >
        {task.task}
      </p>
      <div>
        <span onClick={() => deleteTodo(task.id)} className="delete-icon">
          🗑️
        </span>
      </div>
    </div>
  );
};
