import React from 'react';

// progress = 0 ~ 1
const LoadingBar = ({ duration = 10, color = 'white' }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = 50;
    let passtime = 0;
    const id = setInterval(() => {
      passtime += interval;
      setProgress(passtime / (duration * 1000));
    }, interval);

    return () => { clearInterval(id) };
  }, [duration]);

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
