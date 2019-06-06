import React from 'react';
import movie from './video.mp4';
import './App.css';
import { StoreContext } from './Store';
import Option from './Option';
import LoadingBar from './LoadingBar';

const App = () => {
  const [state, dispatch] = React.useContext(StoreContext);
  const { stage, selectedOption } = state;

  const videoHandler = ({ target: vid }) => {
    console.log(vid.currentTime.toFixed(2));

    const startTime = 0;

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

  const optionOnClick = (index) => {
    console.log();
    dispatch(['DECISION_SELECTED', index]);
  }

  return (
    <div className="container">
      <div className="app-video-section">
        {/* video */}
        <video src={movie} onTimeUpdate={videoHandler} controls></video>

        {/* decision box */}
        <div className="decision-box" style={{ transform: `translateY(${state.showDecisionBox ? 0 : '100%'})` }}>
          { (stage === 2 || stage === 3) && <LoadingBar color={ stage === 3 ? 'grey' : 'white' }/> }
          {
            state.options.map((opt, i) => {
              let visible = 0;
              if (stage === 2 || (stage >= 3 && i === selectedOption)) {
                visible = 1;
              }

              return (
                <Option key={i}
                  visible={visible}
                  onClick={() => optionOnClick(i)}>
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
