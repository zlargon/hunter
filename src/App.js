import React from 'react';
import { StoreContext } from './Store';
import Option from './Option';
import LoadingBar from './LoadingBar';

const App = () => {
  // 1. state and dispatch
  const [state, dispatch] = React.useContext(StoreContext);
  const { stage, selectedOption, currentSource, nextSource } = state;

  // 2. video state and refs
  const videoRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);
  const [isVideoPlay, setVideoPlay] = React.useState(false);
  const [isFullscreen, setFullscreen] = React.useState(document.fullscreen);
  const [videoTime, setVideoTime] = React.useState('0.00');
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
    const { start_time, end_time, select_time } = currentSource;

    // 1. forward (not later than perpare time)
    const prepare_time = end_time - select_time;
    if (sec > 0 && vid.currentTime + sec > prepare_time) {
      vid.currentTime = prepare_time;
      return;
    }

    // 2. backward (not early than start time)
    if (sec < 0 && vid.currentTime + sec < start_time) {
      vid.currentTime = start_time;
      return;
    }

    // 3. normal
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

  // 4. keydown handler
  React.useEffect(() => {
    const handler = ({ keyCode }) => {
      if (state.stage !== 0) {
        return;
      }

      // the function only enable at stage 0
      if (keyCode === 32) togglePlayPause();  // space
      if (keyCode === 37) foward(-10);        // left arrow
      if (keyCode === 39) foward(10);         // right arrow
    }

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [state]);

  // 5. Video Timeupdate Handler
  const videoHandler = ({ target: vid }) => {
    setVideoTime(vid.currentTime.toFixed(2));

    if (currentSource.end_time === null) {
      return;
    }

    // Has Next
    if (currentSource.next) {
      // not yet
      if (vid.currentTime < currentSource.end_time) {
        return;
      }

      // don't jump if the timeline is very closed
      if (Math.abs(vid.currentTime - nextSource.start_time) > 2) {
        vid.currentTime = nextSource.start_time;
      }

      return dispatch(['NEXT_PLOT']);
    }

    const { end_time, select_time } = currentSource;
    const startTime = end_time - select_time;

    // PREPARE : START : PREPARE_END = 1 : 5 : 1

    // after 0
    if (stage === 0 && vid.currentTime >= startTime) {
      return dispatch(['DECISION_PREPARE']);
    }

    // after 1
    if (stage === 1 && vid.currentTime >= startTime + (select_time * 1 / 7)) {
      return dispatch(['DECISION_START']);
    }

    // after 6
    if ((stage === 2 || stage === 3) && vid.currentTime >= startTime + (select_time * 6 / 7)) {
      return dispatch(['DECISION_PREPARE_END']);
    }

    // after 7
    if (stage === 4 && vid.currentTime >= end_time) {
      // don't jump if the timeline is very closed
      if (Math.abs(vid.currentTime - nextSource.start_time) > 2) {
        vid.currentTime = nextSource.start_time;
      }

      return dispatch(['NEXT_PLOT']);
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
        <video ref={videoRef} src={currentSource.video}
          onTimeUpdate={videoHandler}
          onPlay={() => setVideoPlay(true)}
          onPause={() => setVideoPlay(false)}
          onEnded={() => dispatch(['VIDEO_END'])}>
        </video>

        {/* Debug Bar */}
        <div className="top-bar">
          <div>{videoTime}</div>
          <div>{getTimeString(videoTime)}</div>
          <div>{currentSource.name}</div>
        </div>

        {/* control bar */}
        <div className="control-section">
          <div className={controlsClasses.join(' ')}>
            {/* left */}
            <div>
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
            </div>

            <pre>{currentSource.video.split('/').pop()}</pre>

            {/* right */}
            <div>
              <div onClick={fullscreenToggle}>
                { isFullscreen ?
                  <i className="fas fa-compress"></i> :
                  <i className="fas fa-expand"></i>
                }
              </div>
            </div>
          </div>
        </div>

        {/* decision box */}
        <div className={decisionBoxClasses.join(' ')}>
          { (stage === 2 || stage === 3) &&
            <LoadingBar
              duration={currentSource.select_time * 5 / 7 }
              color={ stage === 3 ? 'grey' : 'white' }
            />
          }
          {
            currentSource.options && currentSource.options.map((opt, i) => {
              const visible    = (stage === 2 || (stage >= 3 && i === selectedOption)) ? 1 : 0;
              const selectable = (stage === 3 || stage === 4) ? 0 : 1;

              return (
                <Option key={i}
                  visible={visible}
                  selectable={selectable}
                  onClick={() => dispatch(['DECISION_SELECTED', i])}>
                  { opt }
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
