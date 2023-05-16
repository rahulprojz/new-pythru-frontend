import React from "react";
import { useState, useEffect } from "react";
import "./timmer.scss";
const Timer = (props: any) => {
  const { initialMinute, initialSeconds, setTimmer } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        setTimmer({ second: seconds - 1, minute: minutes });
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          setTimmer({ second: 59, minute: minutes - 1 });
        }
      }
    }, 1000);
    if (!(minutes || seconds)) {
      props?.onTimmerClose && props?.onTimmerClose();
    }
    return () => {
      clearInterval(myInterval);
    };
  });
  useEffect(() => {
    if (!props?.isResendOtp && !props.isThanksPopup) {
      setMinutes(initialMinute);
      setTimmer({ second: initialSeconds, minute: initialMinute });
      setSeconds(initialSeconds);
    }
  }, [props?.isResendOtp]);

  return (
    <>
      {/* {minutes === 0 && seconds === 0
                ? null */}
      {minutes || seconds ? (
        <div className="timmer">
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
      ) : (
        <></>
      )}
      {/* } */}
    </>
  );
};

export default Timer;
