import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';


const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const stopStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <Box>
      <div>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:{("0" + ((time / 10) % 100)).slice(-2)}</div>
      <Button onClick={startStopwatch}>Start</Button>
      <Button onClick={stopStopwatch}>Stop</Button>
      <Button onClick={resetStopwatch}>Reset</Button>
    </Box>
  );
};

export default Stopwatch;
