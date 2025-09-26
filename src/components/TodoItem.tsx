import React from "react";

interface ToDo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoItemProps {
  task: ToDo;
  toggleTask: (id: number) => void;
  editTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTask, editTask, deleteTask }) => {
  return (
    <li
      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span
        onClick={() => toggleTask(task.id)}
        className={`flex-1 cursor-pointer select-none ${task.done ? "line-through text-gray-400" : ""}`}
      >
        {task.text}
      </span>
      <button
        onClick={() => editTask(task.id)}
        className="ml-2 p-1 text-yellow-500 hover:text-yellow-700 hover:bg-yellow-50 rounded transition-colors"
      >
        ✏️
      </button>
      <button
        onClick={() => deleteTask(task.id)}
        className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
      >
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
