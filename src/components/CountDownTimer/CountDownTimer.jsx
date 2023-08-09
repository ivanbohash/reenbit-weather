import "./CountDownTimer.css";
import { useState, useEffect } from "react";

function CountdownTimer({ tripStartDate, loading }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const tripStartDateTime = new Date(tripStartDate + "T00:00:00").getTime();
  const isTodayOrBefore = tripStartDateTime <= Date.now();

  console.log(isTodayOrBefore);

  function calculateTimeLeft() {
    const now = new Date();
    const target = new Date(tripStartDate + "T00:00:00");

    const timeDifference = target - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24) + 1);
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <div className="container">
      {loading ? (
        <></>
      ) : (
        <>
          {isTodayOrBefore ? (
            <li>Your trip starts today☀️</li>
          ) : (
            <>
              <li>
                <span id="days">{timeLeft?.days}</span>days
              </li>
              <li>
                <span id="hours">{timeLeft?.hours}</span>Hours
              </li>
              <li>
                <span id="minutes">{timeLeft?.minutes}</span>Minutes
              </li>
              <li>
                <span id="seconds">{timeLeft?.seconds}</span>Seconds
              </li>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CountdownTimer;
