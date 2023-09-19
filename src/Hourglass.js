import React from 'react';
import './Hourglass.css';

const Hourglass = ({ currentTime, duration }) => {
  // Calculate the percentage of time remaining
  const percentageRemaining = (currentTime / duration) * 100;

  return (
    <div className="hourglass-container">
      <div className="hourglass">
        <div className="upper"></div>
        <div className="lower"></div>
      </div>
      <div className="timer-value">
        {currentTime}/{duration} seconds
      </div>
      <div className="sand" style={{ height: `${percentageRemaining}%` }}></div>
    </div>
  );
};

export default Hourglass;
