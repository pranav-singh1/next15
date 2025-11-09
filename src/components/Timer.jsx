import { useState, useEffect } from 'react';
import peterSound from '../assets/peter.mp3';

function Timer({ onTimerEnd, started }) {
  const [seconds, setSeconds] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          // Timer hit 0, trigger alert and restart
          if (onTimerEnd) {
            // Use the imported asset URL so Vite resolves the file correctly
            const alarm = new Audio(peterSound);
            alarm.preload = 'auto';
            alarm.volume = 1;
            // Play returns a promise; catch rejections (autoplay blocked, decode errors)
            alarm.play().catch((err) => {
              // Helpful debug info in the console; if autoplay is blocked the user
              // may need to interact with the page (click) before sounds are allowed.
              // Optionally, you can show a UI hint to the user here.
              // eslint-disable-next-line no-console
              console.warn('Audio play prevented or failed:', err);
            });
            onTimerEnd();
          }
          return 15 * 60; // Reset to 15 minutes and keep going
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, onTimerEnd]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-6">
      <div className="text-6xl font-bold text-black mb-2">
        {formatTime(seconds)}
      </div>
      <div className="text-sm text-gray-600">
        {started ? 'Timer running...' : 'Save your first log to start'}
      </div>
    </div>
  );
}

export default Timer;
