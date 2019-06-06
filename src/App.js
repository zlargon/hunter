import React from 'react';
import movie from './video.mp4';
import './App.css';

const App = () => {

  const videoHandler = ({ target: vid }) => {
    console.dir(vid);
    console.log('currentTime:', vid.currentTime);
    console.log('duration:', vid.duration);

    if (vid.currentTime >= 10) {
      vid.currentTime = 0;
    }
  }

  return (
    <div className="container">
      <div className="app-video-section">
        <video style={{ width: '100%' }}
          src={movie}
          onTimeUpdate={videoHandler}
          controls>
        </video>

        {/* decision box */}
        <div className="decision-box">
          <div className="option">
            <div>option 1</div>
            <div className="underline effect"></div>
          </div>
          <div className="option">
            <div>option 2</div>
            <div className="underline effect"></div>
          </div>
          <div className="option">
            <div>option 3</div>
            <div className="underline effect"></div>
          </div>
          <div className="option">
            <div>option 4</div>
            <div className="underline effect"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
