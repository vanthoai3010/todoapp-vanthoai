import React from "react";

interface TodoFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ value, onChange, onSubmit }) => {
  return (

    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={onSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Nhập vào task..."
            className="flex-1 ml-5 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="px-6 mr-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
