import React from 'react';
import { useObservable } from "rxjs-hooks";
import { interval } from "rxjs";

// progress = 0 ~ 1
const LoadingBar = ({ color = 'white' }) => {
  const t = 50;         // 50ms
  const d = 10 * 1000;  // 10sec

  const v = useObservable(() => interval(t));
  const progress = (1 - ((v * t) / d)) * 100;

  const style = {
    backgroundColor: color,
    width: progress + '%'
  };

  return (
    <div className="loading-bar">
      <div style={style}></div>
    </div>
  );
}

export default LoadingBar;
