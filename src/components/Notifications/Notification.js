// import React from "react";

// export default function Notification({ message }) {
//   return <div className="notification">Notification</div>;
// }

import React, { useState, useEffect, useCallback } from "react";

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handleCloseNotification = useCallback(() => {
    clearInterval(intervalID);
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  }, [props, intervalID]);

  useEffect(() => {
    if (timer === 50) {
      // Close notification
      handleCloseNotification();
    }
  }, [timer, handleCloseNotification]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      className={`notification-item ${
        props.type === "SUCCESS" ? "success" : "error"
      } ${exit ? "exit" : ""}`}
    >
      <p>{props.message}</p>
      {/* <div className={"bar"} style={{ width: `${width}%` }} /> */}
    </div>
  );
};

export default Notification;
