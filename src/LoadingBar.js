import React from 'react';
import { useObservable } from "rxjs-hooks";
import { interval } from "rxjs";

// progress = 0 ~ 1
const LoadingBar = () => {
  const t = 50;         // 50ms
  const d = 10 * 1000;  // 10sec

  const v = useObservable(() => interval(t));
  const progress = (1 - ((v * t) / d)) * 100;

  return (
    <div className="loading-bar">
      <div style={{ width: progress + '%' }}></div>
    </div>
  );
}

export default LoadingBar;
