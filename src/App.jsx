import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import LogList from './components/LogList';
import TodoList from './components/TodoList';

function App() {
  const [logText, setLogText] = useState('');
  const [logs, setLogs] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [todos, setTodos] = useState([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('next15-logs');
    if (savedLogs) {
      try {
        const parsedLogs = JSON.parse(savedLogs);
        setLogs(parsedLogs);
        // If there are existing logs, timer should be running
        if (parsedLogs.length > 0) {
          setTimerStarted(true);
        }
      } catch (error) {
        console.error('Error loading logs:', error);
      }
    }
  }, []);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('next15-todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('next15-logs', JSON.stringify(logs));
  }, [logs]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('next15-todos', JSON.stringify(todos));
  }, [todos]);

  const handleSaveLog = () => {
    if (logText.trim() === '') {
      alert('Please enter some text before saving.');
      return;
    }

    const newLog = {
      id: Date.now(),
      timestamp: Date.now(),
      text: logText.trim()
    };

    setLogs((prevLogs) => [newLog, ...prevLogs]);
    setLogText('');

    // Start timer after first save
    if (!timerStarted) {
      setTimerStarted(true);
    }
  };

  const handleDeleteLog = (id) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleTimerEnd = () => {
    alert('Time to log your last 15 minutes.');
  };

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black text-center mb-8">
          Next 15
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Timer and Log Input */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg">
              {/* Timer */}
              <Timer onTimerEnd={handleTimerEnd} started={timerStarted} />

              {/* Text Area */}
              <div className="mb-6">
                <label
                  htmlFor="log-input"
                  className="block text-black font-medium mb-2"
                >
                  What did you do in the last 15 minutes?
                </label>
                <textarea
                  id="log-input"
                  value={logText}
                  onChange={(e) => setLogText(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-black"
                  placeholder="Enter your productivity log here..."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveLog}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Save Log
              </button>
            </div>

            {/* Logs List */}
            <LogList logs={logs} onDeleteLog={handleDeleteLog} />
          </div>

          {/* Right Column - Todo List */}
          <div>
            <TodoList
              todos={todos}
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
