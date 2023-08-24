import { useState } from "react";
import Todo from "./components/Todo";
import { FaPlus } from "react-icons/fa6";

function App() {
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([
    { id: 1, text: "Go to work", completed: true },
    { id: 2, text: "Finish work project", completed: true },
    { id: 3, text: "Go for a run", completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState("");

  const addTodo = () => {
    if (newTodoText.trim() === "") return;
    const newTodo = { id: Date.now(), text: newTodoText, completed: false };
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: number, newText: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-md shadow min-w-md">
        <h1 className="flex justify-center mt-6 mb-4 text-2xl font-semibold text-gray-950">
          Todo List
        </h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new Todo..."
            className="flex-grow px-3 py-2 text-gray-900 bg-gray-200 border rounded focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="px-3 py-1 ml-2 text-white bg-blue-500 rounded hover:shadow-lg hover:bg-blue-800 focus:outline-none"
          >
            <FaPlus />
          </button>
        </div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
