import React, { useEffect, useState } from 'react';
import './Hourglass.css';

const Hourglass = ({ currentTime, duration }) => {
  const [sandAnimation, setSandAnimation] = useState('');
  const [flipAnimation, setFlipAnimation] = useState('');

  useEffect(() => {
    if (currentTime === 0) {
      // Reset the animations when the timer is reset
      setSandAnimation('');
      setFlipAnimation('');
    } else if (currentTime < duration / 2) {
      // First half of the timer, sand fills bottom
      setSandAnimation('fillBottom');
      setFlipAnimation('');
    } else {
      // Second half of the timer, flip the hourglass and fill top
      setSandAnimation('fillTop');
      setFlipAnimation('flipped');
    }
  }, [currentTime, duration]);

  return (
    <div className={`wrap ${flipAnimation}`}>
      <div className={`parts ${flipAnimation}`} id="top">
        <div className={`sand ${sandAnimation}`} />
      </div>
      <div className={`parts ${flipAnimation}`} id="bottom">
        <div className={`sand ${sandAnimation}`} />
      </div>
      <div id="fill" className={`sand ${sandAnimation}`} />
    </div>
  );
};

export default Hourglass;
