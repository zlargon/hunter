import React from 'react';
import movie from './video.mp4';
import './App.css';
import { StoreContext } from './Store';
import Option from './Option';
import LoadingBar from './LoadingBar';

const App = () => {
  const videoRef = React.createRef();
  const [state, dispatch] = React.useContext(StoreContext);
  const { stage, selectedOption } = state;
  const [videoPlay, setVideoPlay] = React.useState(false);

  const videoHandler = ({ target: vid }) => {
    console.log(vid.currentTime.toFixed(2));

    const startTime = 15;

    // 0 ~ 3s
    if (stage === 0 && vid.currentTime >= startTime) {
      return dispatch(['DECISION_PREPARE']);
    }

    // 3 ~ 13s
    if (stage === 1 && vid.currentTime >= startTime + 3) {
      return dispatch(['DECISION_START']);
    }

    // 3 ~ 8s (TODO: move to click event)
    // if (stage === 2 && vid.currentTime >= startTime + 8) {
    //   return dispatch(['DECISION_SELECTED']);
    // }

    // 13 ~ 15s
    if ((stage === 2 || stage === 3) && vid.currentTime >= startTime + 13) {
      return dispatch(['DECISION_PREPARE_END']);
    }

    // after 15s
    if (stage === 4 && vid.currentTime >= startTime + 15) {
      return dispatch(['DECISION_END']);
    }
  }

  const togglePlayPause = () => {
    const vid = videoRef.current;
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
    setVideoPlay(!vid.paused);
    console.dir(vid);
  }

  const foward = (sec) => {
    const vid = videoRef.current;
    vid.currentTime += sec;
  }

  const fullScreen = () => {
    const vid = videoRef.current;
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.msRequestFullscreen) {
      vid.msRequestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
  }

  return (
    <div className="container">
      <div className="app-video-section">
        {/* video */}
        <video ref={videoRef} src={movie} onTimeUpdate={videoHandler}></video>

        {/* control bar */}
        <div className="control-section">
          <div className="controls">
            <div onClick={togglePlayPause}>
              <i className={`fas fa-${videoPlay ? 'pause' : 'play'}`}></i>
            </div>
            <div onClick={() => foward(-10)}>
              <i className="fas fa-undo-alt"></i>
            </div>
            <div onClick={() => foward(10)}>
              <i className="fas fa-redo-alt"></i>
            </div>
            <div onClick={fullScreen}>
              <i className="fas fa-expand"></i>
            </div>
          </div>
        </div>

        {/* decision box */}
        <div className="decision-box" style={{ transform: `translateY(${state.showDecisionBox ? 0 : '100%'})` }}>
          { (stage === 2 || stage === 3) && <LoadingBar color={ stage === 3 ? 'grey' : 'white' }/> }
          {
            state.options.map((opt, i) => {
              let visible = 0;
              if (stage === 2 || (stage >= 3 && i === selectedOption)) {
                visible = 1;
              }

              const selectable = (stage === 3 || stage === 4) ? 0 : 1;

              return (
                <Option key={i}
                  visible={visible}
                  selectable={selectable}
                  onClick={() => dispatch(['DECISION_SELECTED', i])}>
                  { opt.value }
                </Option>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
