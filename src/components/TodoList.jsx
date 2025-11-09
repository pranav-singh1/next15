import { useState } from 'react';

function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }) {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task');
      return;
    }

    onAddTodo(newTask.trim());
    setNewTask('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg h-full">
      <h2 className="text-2xl font-bold text-black mb-6">Task List</h2>

      {/* Add Task Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
          />
          <button
            onClick={handleAddTask}
            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />

              {/* Task Text */}
              <span
                className={`flex-1 text-black ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
                title="Delete task"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
