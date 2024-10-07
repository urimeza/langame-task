import React, { useState, useEffect } from "react";

export default function Timer(): JSX.Element {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="timer">{time}</div>;
}
