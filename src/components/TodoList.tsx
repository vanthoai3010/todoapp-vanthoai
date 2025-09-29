import React from "react";
import TodoItem from "./TodoItem";

interface ToDo {
  id: number;
  text: string;
  done: boolean;
}

interface TodoListProps {
  tasks: ToDo[];
  toggleTask: (id: number) => void;
  editTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask, editTask, deleteTask }) => {
  return (
    <>
      <ul className="space-y-2 px-5 py-5" >
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
      </ul>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6 mb-5">Chưa có công việc nào</p>
      )}
    </>
  );
};

export default TodoList;
