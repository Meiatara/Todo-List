import { useState } from "react";
import { FaPen, FaTrash, FaCheck, FaX } from "react-icons/fa6";

interface TodoProps {
  todo: { id: number; text: string; completed: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

function Todo({ todo, onToggle, onDelete, onEdit }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex items-center mb-2 p-2 border-2 border-gray-200 rounded ${
        todo.completed ? "line-through text-gray-500" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="mr-2"
      />
      {isEditing ? (
        <div className="flex-grow">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-grow py-1 pl-1 text-gray-900 bg-gray-200 rounded focus:border-blue-500 focus:outline-non"
          />
        </div>
      ) : (
        <div className="flex-grow pr-3">
          <span className="text-gray-950">{todo.text}</span>
        </div>
      )}
      <div>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="ml-2 text-green-600 bg-transparent border-gray-500 hover:border-green-600"
            >
              <FaCheck />
            </button>
            <button
              onClick={handleCancel}
              className="ml-1 text-red-600 bg-transparent border-gray-500 hover:border-red-600"
            >
              <FaX />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="ml-2 text-blue-600 bg-transparent border-gray-500"
            >
              <FaPen />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="ml-1 text-red-600 bg-transparent border-gray-500 hover:border-red-600"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Todo;
