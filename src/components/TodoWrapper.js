import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo => {
    if (todo.trim() === '') return;
    setTodos([...todos, { task: todo, completed: false, id: Date.now() }]);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="TodoWrapper">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter('all')} className="todo-btn">All</button>
        <button onClick={() => setFilter('active')} className="todo-btn">Active</button>
        <button onClick={() => setFilter('completed')} className="todo-btn">Completed</button>
      </div>
      {filteredTodos.map(todo => (
        <Todo
          key={todo.id}
          task={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};
