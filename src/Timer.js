import React, { useState, useEffect } from 'react';
import Hourglass from './Hourglass';
import './Timer.css'; // Import the Timer.css file

const Timer = () => {
  const [duration, setDuration] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;

    if (running && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, currentTime, duration]);

  const startTimer = () => {
    if (!running) {
      setRunning(true);
    }
  };

  const pauseTimer = () => {
    if (running) {
      setRunning(false);
    }
  };

  const resetTimer = () => {
    setRunning(false);
    setCurrentTime(0);
  };

  return (
    <div className="timer-page">
      <div className="hourglass-time">
      <Hourglass currentTime={currentTime} duration={duration} running={running} />
      </div>
      <div className="timer-container"> 
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="timer-input" 
        />
        <div className="timer-display">Time Remaining: {duration - currentTime} seconds</div>
        <button onClick={startTimer} className="timer-button">Start</button>
        <button onClick={pauseTimer} className="timer-button">Pause</button>
        <button onClick={resetTimer} className="timer-button">Reset</button>
      </div>
    </div>
  );
};

export default Timer;
