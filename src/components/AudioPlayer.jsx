import { useState, useRef } from 'react';
import audioFile from '../assets/dothatshit.mp3';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <button
        onClick={togglePlay}
        className={`group relative bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 ${
          isPlaying ? 'animate-pulse' : ''
        }`}
        style={{
          padding: '24px',
          minWidth: '180px',
          minHeight: '180px',
        }}
      >
        {/* Animated background ring when playing */}
        {isPlaying && (
          <div className="absolute inset-0 rounded-2xl border-4 border-white animate-ping opacity-75"></div>
        )}
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* Icon */}
          <div className="mb-3">
            {isPlaying ? (
              <svg
                className="w-16 h-16 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-16 h-16 drop-shadow-lg transform group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
          
          {/* Text */}
          <div className="text-center">
            <div className="font-bold text-lg mb-1">
              {isPlaying ? 'Now Playing' : 'Do That Shit'}
            </div>
            <div className="text-xs opacity-90 font-medium">
              {isPlaying ? 'Click to pause' : 'Click to play'}
            </div>
          </div>
        </div>

        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioFile}
        onEnded={handleEnded}
      />
    </div>
  );
}

export default AudioPlayer;

