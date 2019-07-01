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
    const handler = () => {
      setFullscreen(document.fullscreen);
    }
    document.addEventListener('fullscreenchange', handler);
    return () => {
      document.removeEventListener('fullscreenchange', handler);
    }
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
  const foward = React.useCallback((sec) => {
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
  }, [currentSource]);

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
      if (stage !== 0) {
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
  }, [stage, foward]);

  // 5. Video Timeupdate Handler
  const videoHandler = ({ target: vid }) => {
    setVideoTime(vid.currentTime.toFixed(2));

    // 5-1. not next (ending plot)
    if (currentSource.next.length === 0 || currentSource.end_time === null) {

      // end of video
      if (vid.currentTime >= currentSource.end_time) {
        // force stop the video
        vid.pause();
        return dispatch(['VIDEO_END']);
      }

      return;
    }

    // 5-2. only one next
    if (currentSource.next.length === 1) {
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

    // 5-3. multiple next
    const { end_time, select_time } = currentSource;
    const startTime = end_time - select_time;

    // PREPARE : START : PREPARE_END = 1 : 5 : 1

    // after 0
    if (stage === 0 && vid.currentTime >= startTime) {
      // force play the video
      vid.play();

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

  // TODO: debug
  const onVideoError = (e) => {
    console.log('onerror');
    console.log(e);
  }

  return (
    <div className="app" >
      <main ref={videoContainerRef}>
        {/* 1. video */}
        <video ref={videoRef} src={currentSource.video}
          autoPlay={process.env.NODE_ENV !== 'development'}
          onTimeUpdate={videoHandler}
          onPlay={() => setVideoPlay(true)}
          onPause={() => setVideoPlay(false)}
          onError={onVideoError}
          onEnded={() => dispatch(['VIDEO_END'])}>
        </video>

        {/* 2. debug bar */}
        { process.env.NODE_ENV === 'development' &&
          <div className="debug-bar">
            <div>{videoTime}</div>
            <div>{getTimeString(videoTime)}</div>
            <div>{currentSource.name}</div>
          </div>
        }

        {/* 3. control section */}
        <div className="control-section">
          <div className={controlsClasses.join(' ')}>
            {/* 3-1-1. left */}
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

            {/* 3-1-2. middle */}
            <pre>{
              process.env.NODE_ENV === 'development' &&
              currentSource.video.split('/').pop()
            }</pre>

            {/* 3-1-3. right */}
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

        {/* 4. decision box */}
        <div className={decisionBoxClasses.join(' ')}>
          { (stage === 2 || stage === 3) &&
            <LoadingBar
              duration={currentSource.select_time * 5 / 7 }
              color={ stage === 3 ? 'grey' : 'white' }
            />
          }
          {
            currentSource.next.length > 1 && currentSource.next.map((opt, i) => {
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
      </main>
    </div>
  );
}

export default App;
