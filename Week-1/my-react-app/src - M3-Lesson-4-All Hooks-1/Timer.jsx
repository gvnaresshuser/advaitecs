import React, { useRef, useState } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef(null);
    //null - falsey value initially
    //123 - truthy value when interval is set

    const startTimer = () => {
        //COMMENT THIS IF BLOCK FOR TESTING..AND CLICK START MULTIPLE TIMES
        //YOU WILL SEE THE COUNTER INCREASING FASTER THERE BY CREATING MULTIPLE INTERVALS
        if (!intervalRef.current) {//VERY IMPORTANT CHECK TO AVOID MULTIPLE INTERVALS
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1); // update UI
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    return (
        <div>
            <p>⏱ Seconds: {seconds}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
};

export default Timer;
