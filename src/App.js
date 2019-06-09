import React from 'react';
import { StoreContext } from './Store';
import Option from './Option';
import LoadingBar from './LoadingBar';

const App = () => {
  // 1. state and dispatch
  const [state, dispatch] = React.useContext(StoreContext);
  const { stage, selectedOption, currentSource, nextSource } = state;

  // 2. video state and refs
  const videoRef = React.createRef();
  const containerRef = React.createRef();
  const [isVideoPlay, setVideoPlay] = React.useState(false);
  const [isFullscreen, setFullscreen] = React.useState(document.fullscreen);
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
      document.exitFullscreen();                // close fullscreen
    } else {
      containerRef.current.requestFullscreen(); // open fullscreen
    }
  }

  // 4. Video Timeupdate Handler
  const videoHandler = ({ target: vid }) => {
    console.log(vid.currentTime.toFixed(2));

    if (currentSource.end_time === null) {
      return;
    }

    const startTime = currentSource.end_time - 15;
    console.log('startTime', startTime);

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

  return (
    <div ref={containerRef} className="container" >
      <div className="app-video-section">
        {/* video */}
        <video ref={videoRef} src="/videos/video.mp4"
          onTimeUpdate={videoHandler}
          onPlay={() => setVideoPlay(true)}
          onPause={() => setVideoPlay(false)}>
        </video>

        {/* control bar */}
        <div className="control-section">
          <div className="controls">
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
        <div className="decision-box" style={{ transform: `translateY(${state.showDecisionBox ? 0 : '100%'})` }}>
          { (stage === 2 || stage === 3) && <LoadingBar color={ stage === 3 ? 'grey' : 'white' }/> }
          {
            currentSource.options && currentSource.options.map((opt, i) => {
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
