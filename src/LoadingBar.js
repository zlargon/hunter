import React from 'react';

// progress = 0 ~ 1
const LoadingBar = ({ color = 'white' }) => {
  const interval = 50;          // 50ms
  const duration = 10 * 1000;   // 10sec
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let passtime = 0;
    const id = setInterval(() => {
      passtime += interval;
      setProgress(passtime / duration);
    }, interval);

    return () => { clearInterval(id) };
  }, []);

  const style = {
    backgroundColor: color,
    width: progress * 100 + '%'
  };

  return (
    <div className="loading-bar">
      <div style={style}></div>
    </div>
  );
}

export default LoadingBar;
