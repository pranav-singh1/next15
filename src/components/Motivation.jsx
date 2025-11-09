import { useState, useEffect } from 'react';

const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Small progress is still progress.",
  "Focus on being productive instead of busy.",
  "Done is better than perfect.",
  "Stay focused and keep shipping.",
  "Make each day your masterpiece.",
  "Quality over quantity.",
  "Start where you are. Use what you have. Do what you can.",
  "The secret of getting ahead is getting started.",
  "Don't wait for opportunity. Create it.",
  "No quote will work unless you do.",
  "I can do anything"
];

function Motivation() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Set initial quote
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Change quote every 5 minutes
    const interval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 max-w-sm p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 z-50">
      <p className="text-sm text-gray-600 italic">"{quote}"</p>
    </div>
  );
}

export default Motivation;