import { useState, useEffect, useRef } from 'react';
import peterSound from '../assets/peter.mp3';

function Timer({ onTimerEnd, started, duration = 15 }) {
  const TIMER_DURATION = duration * 60; // Convert minutes to seconds
  const [seconds, setSeconds] = useState(TIMER_DURATION);
  const endTimeRef = useRef(null);
  const audioRef = useRef(null);

  // Preload audio on component mount
  useEffect(() => {
    const alarm = new Audio(peterSound);
    alarm.preload = 'auto';
    alarm.volume = 1;
    audioRef.current = alarm;
  }, []);

  // Reset timer when duration changes
  useEffect(() => {
    setSeconds(TIMER_DURATION);
    endTimeRef.current = null;
  }, [TIMER_DURATION]);

  useEffect(() => {
    if (!started) {
      endTimeRef.current = null;
      setSeconds(TIMER_DURATION);
      return;
    }

    // Set the end time when timer starts
    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + TIMER_DURATION * 1000;
    }

    // Use a more frequent check (100ms) for smoother updates
    // This still works in background tabs because we calculate based on actual time
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((endTimeRef.current - now) / 1000);

      if (remaining <= 0) {
        // Timer hit 0, trigger alert and restart
        if (onTimerEnd) {
          // Play the preloaded audio
          if (audioRef.current) {
            audioRef.current.currentTime = 0; // Reset to start
            audioRef.current.play().catch((err) => {
              // eslint-disable-next-line no-console
              console.warn('Audio play prevented or failed:', err);
            });
          }
          onTimerEnd();
        }
        // Reset timer for next cycle
        endTimeRef.current = Date.now() + TIMER_DURATION * 1000;
        setSeconds(TIMER_DURATION);
      } else {
        setSeconds(remaining);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [started, onTimerEnd, TIMER_DURATION]);

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
