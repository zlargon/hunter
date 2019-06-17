import React from 'react';
import { StoreContext } from './Store';
import Option from './Option';
import LoadingBar from './LoadingBar';
import mov from './videos/video.mp4';

const App = () => {
  // 1. state and dispatch
  const [state, dispatch] = React.useContext(StoreContext);
  const { stage, selectedOption, currentSource, nextSource } = state;

  // 2. video state and refs
  const videoRef = React.createRef();
  const videoContainerRef = React.createRef();
  const [isVideoPlay, setVideoPlay] = React.useState(false);
  const [isFullscreen, setFullscreen] = React.useState(document.fullscreen);
  const [videoTime, setVideoTime] = React.useState('00.00');
  React.useEffect(() => {
    document.addEventListener('fullscreenchange', (e) => {
      setFullscreen(document.fullscreen);
    });
  }, []);

  // 3. video functions
  // 3-1. Play / Pause Toggle
  const togglePlayPause = () => {
    const vid = videoRef.current;
    if (vid.paused) {
      vid.play();
    } else {
      vid.pause();
    }
  }

  // 3-2. forward / backward
  const foward = (sec) => {
    const vid = videoRef.current;
    vid.currentTime += sec;
  }

  // 3-3. fullscreen toggle
  const fullscreenToggle = () => {
    if (document.fullscreen) {
      // close fullscreen
      document.exitFullscreen();
    } else {
      // open fullscreen
      videoContainerRef.current.requestFullscreen();
    }
  }

  // 4. Video Timeupdate Handler
  const videoHandler = ({ target: vid }) => {
    setVideoTime(vid.currentTime.toFixed(2));

    if (currentSource.end_time === null) {
      return;
    }

    const startTime = currentSource.end_time - 15;

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
      // don't jump if the timeline is very closed
      if (Math.abs(vid.currentTime - nextSource.start_time) > 2) {
        vid.currentTime = nextSource.start_time;
      }

      return dispatch(['DECISION_END']);
    }
  }

  // controls classes
  const controlsClasses = ['controls'];
  if (state.allowControls) controlsClasses.push('allow');
  if (!isVideoPlay) controlsClasses.push('show');

  // decision box classes
  const decisionBoxClasses = ['decision-box'];
  if (state.showDecisionBox) decisionBoxClasses.push('show');

  const getTimeString = (time) => {
    const t = new Date(time * 1000);
    const s = ('00' + t.getSeconds()).slice(-2);
    const m = ('00' + t.getMinutes()).slice(-2);
    return `${m}:${s}`;
  }

  return (
    <div className="container" >
      <div ref={videoContainerRef} className="app-video-section">
        {/* video */}
        <video ref={videoRef} src={mov}
          onTimeUpdate={videoHandler}
          onPlay={() => setVideoPlay(true)}
          onPause={() => setVideoPlay(false)}
          onEnded={() => dispatch(['DECISION_END'])}>
        </video>

        {/* Debug Bar */}
        <div className="top-bar">
          <div>{videoTime}</div>
          <div>{getTimeString(videoTime)}</div>
        </div>

        {/* control bar */}
        <div className="control-section">
          <div className={controlsClasses.join(' ')}>
            <div onClick={togglePlayPause}>
              { isVideoPlay ?
                <i className="fas fa-pause"></i> :
                <i className="fas fa-play"></i>
              }
            </div>
            <div onClick={() => foward(-10)}>
              <i className="fas fa-undo-alt"></i>
            </div>
            <div onClick={() => foward(10)}>
              <i className="fas fa-redo-alt"></i>
            </div>
            <div onClick={fullscreenToggle}>
              { isFullscreen ?
                <i className="fas fa-compress"></i> :
                <i className="fas fa-expand"></i>
              }
            </div>
          </div>
        </div>

        {/* decision box */}
        <div className={decisionBoxClasses.join(' ')}>
          { (stage === 2 || stage === 3) && <LoadingBar color={ stage === 3 ? 'grey' : 'white' }/> }
          {
            currentSource.options && currentSource.options.map((opt, i) => {
              const visible    = (stage === 2 || (stage >= 3 && i === selectedOption)) ? 1 : 0;
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
