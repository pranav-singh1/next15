import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import LogList from './components/LogList';
import TodoList from './components/TodoList';
import Motivation from './components/Motivation';
import AudioPlayer from './components/AudioPlayer';
import DarkVeil from './components/DarkVeil';
import ImageTrail from './components/ImageTrail';

// Import all images
import img1 from './assets/1955f4a075af0691b6487a5694ec93d6.jpg';
import img2 from './assets/2fe371dfdfbeaf441dd611cb3b492bd3.jpg';
import img3 from './assets/452269f45d2adff20e329f85234b384a.jpg';
import img4 from './assets/5cfb0fe794bfa99233ae033848a6c712.jpg';
import img5 from './assets/6e3eb22d3cb436a8bd0466d9e1a6a8bf.jpg';
import img6 from './assets/6e91ec2bf3ac22b7e4984dc324590574.jpg';
import img7 from './assets/6fa5c0bc475a26fc1d47ff1202262e1e.jpg';
import img8 from './assets/9502eb77932226efa7b1df10cf6e4b9d.jpg';
import img9 from './assets/a51a0cf65dbb2c05da8d47e53cbbc4f7.jpg';
import img10 from './assets/a59ea9071920e38c38ad053f61db0205.jpg';
import img11 from './assets/aedc4104ae146f0bab9f6476628b7980.jpg';
import img12 from './assets/aef4b80c24f454e4b800268cbe77c833.jpg';
import img13 from './assets/be63c84f436343773b00a9cecf12d33c.jpg';
import img14 from './assets/cc70da908fc7bf22fa2eb9e66ffe0b27.jpg';
import img15 from './assets/d9464ab8fccd527bfb584a41ffa86586.jpg';
import img16 from './assets/e3a3a290622469edbfc5f1407e3905ba.jpg';
import img17 from './assets/fb56d508e31b3d7f7c9c97550b9eb98f.jpg';
import mountainBg from './assets/killjaro.jpg';

function App() {
  const [logText, setLogText] = useState('');
  const [logs, setLogs] = useState([]);
  const [timerStarted, setTimerStarted] = useState(false);
  const [todos, setTodos] = useState([]);
  const [timerDuration, setTimerDuration] = useState(15); // in minutes
  const [showSettings, setShowSettings] = useState(false);
  const [customDuration, setCustomDuration] = useState('');

  // Array of motivational images
  const motivationalImages = [
    mountainBg, img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12, img13, img14, img15, img16, img17
  ];

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

  // Load timer duration from localStorage on mount
  useEffect(() => {
    const savedDuration = localStorage.getItem('next15-timer-duration');
    if (savedDuration) {
      try {
        setTimerDuration(parseInt(savedDuration, 10));
      } catch (error) {
        console.error('Error loading timer duration:', error);
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

  // Save timer duration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('next15-timer-duration', timerDuration.toString());
  }, [timerDuration]);

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
    alert(`Time to log your last ${timerDuration} minutes.`);
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

  const handleDurationChange = (duration) => {
    setTimerDuration(duration);
    setShowSettings(false);
    setCustomDuration('');
  };

  const handleCustomDurationSubmit = () => {
    const duration = parseInt(customDuration, 10);
    if (!isNaN(duration) && duration > 0 && duration <= 1440) {
      setTimerDuration(duration);
      setCustomDuration('');
      setShowSettings(false);
    } else {
      alert('Please enter a valid duration between 1 and 1440 minutes (24 hours).');
    }
  };

  return (
    <>
      {/* Light Veil Background */}
      <div className="fixed inset-0 z-0 bg-white">
        <div style={{ 
          width: '100%', 
          height: '100%', 
          filter: 'invert(1) hue-rotate(20deg) brightness(1.2) saturate(0.8)',
          opacity: 0.4
        }}>
          <DarkVeil 
            hueShift={200}
            noiseIntensity={0.01}
            scanlineIntensity={0.05}
            warpAmount={0.4}
            speed={0.3}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8" style={{ textShadow: '2px 2px 8px rgba(255,165,0,0.3)' }}>
          Next 15
        </h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Timer and Log Input */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-300 rounded-2xl p-8 shadow-lg">
              {/* Timer */}
              <Timer
                onTimerEnd={handleTimerEnd}
                started={timerStarted}
                duration={timerDuration}
              />

              {/* Timer Settings Toggle */}
              <div className="mb-6 text-center">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-sm text-gray-600 hover:text-black transition-colors underline"
                >
                  {showSettings ? 'Hide' : 'Change'} timer duration
                </button>
              </div>

              {/* Timer Settings Panel */}
              {showSettings && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="text-sm font-medium text-black mb-3">Select Duration</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[5, 10, 15, 20, 25, 30, 45, 60, 90].map((minutes) => (
                      <button
                        key={minutes}
                        onClick={() => handleDurationChange(minutes)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          timerDuration === minutes
                            ? 'bg-black text-white'
                            : 'bg-white text-black border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {minutes} min
                      </button>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <label className="block text-xs text-gray-600 mb-2">
                      Custom duration (minutes)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        max="1440"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(e.target.value)}
                        placeholder="Enter minutes..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        onClick={handleCustomDurationSubmit}
                        className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Set
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Text Area */}
              <div className="mb-6">
                <label
                  htmlFor="log-input"
                  className="block text-black font-medium mb-2"
                >
                  What did you do in the last {timerDuration} minutes?
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

          {/* Right Column - Todo List and Mountain Image */}
          <div className="flex flex-col gap-8">
            <div className="flex-shrink-0">
              <TodoList
                todos={todos}
                onAddTodo={handleAddTodo}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </div>

            {/* Interactive Image Trail */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl shadow-lg flex-shrink-0 relative" style={{ height: '500px', overflow: 'hidden' }}>
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm pointer-events-none z-0">
                Make this your life
              </div>
              <ImageTrail items={motivationalImages} variant={2} />
            </div>
          </div>
        </div>
        </div>
      </div>
      <Motivation />
      <AudioPlayer />
    </>
  );
}

export default App;
