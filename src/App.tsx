import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";


interface ToDo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");

  const [tasks, setTasks] = useState<ToDo[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Lưu vào localStorage khi tasks thay đổi
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newValue = value.trim();

    if (newValue === "") {
      toast.error("Task không được bỏ trống");
      return;
    }

    // Kiểm tra trùng lặp
    const isDuplicate = tasks.some(
      (task) => task.text.toLowerCase() === newValue.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Task đã tồn tại!");
      return;
    }
    const newTask: ToDo = {
      id: Date.now(),
      text: newValue,
      done: false,
    };

    setTasks([...tasks, newTask]);
    toast.success("Thêm task mới thành công");
    setValue("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Xóa task thành công");
  };

  const editTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    const newText = prompt("Chỉnh sửa task:", taskToEdit.text);
    if (newText === null) return; // Người dùng hủy bỏ

    const trimmedText = newText.trim();
    if (trimmedText === "") {
      toast.error("Task không được bỏ trống");
      return;
    }

    // Kiểm tra trùng lặp
    const isDuplicate = tasks.some(
      (task) =>
        task.text.toLowerCase() === trimmedText.toLowerCase() && task.id !== id
    );

    if (isDuplicate) {
      toast.error("Task đã tồn tại!");
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: trimmedText } : task
      )
    );
    toast.success("Chỉnh sửa task thành công");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#dd3e54] to-[#6be585] py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md " >
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 items-center"
          style={{
            border: '1px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(to right, #CA9E21, #0A6486)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            borderRadius: '5px',
          }}>


          <h1 className="text-lg uppercase text-center mt-10 sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#47caeb] to-[#ff7e5f] bg-clip-text text-transparent">
            ToDo App
          </h1>

          <TodoForm
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleAddTask}
          />

          <TodoList
            tasks={tasks}
            toggleTask={toggleTask}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default App;
