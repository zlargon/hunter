import React from 'react';
import movie from './video.mp4';
import './App.css';
import { StoreContext } from './Store';
import Option from './Option';

const App = () => {
  const [state, dispatch] = React.useContext(StoreContext);

  const videoHandler = ({ target: vid }) => {
    console.log(vid.currentTime.toFixed(2));

    const startTime = 5;

    // 0 ~ 3s
    if (state.stage === 0 && vid.currentTime >= startTime) {
      return dispatch(['DECISION_PREPARE']);
    }

    // 3 ~ 13s
    if (state.stage === 1 && vid.currentTime >= startTime + 3) {
      return dispatch(['DECISION_START']);
    }

    // 13 ~ 15s
    if (state.stage === 2 && vid.currentTime >= startTime + 13) {
      return dispatch(['DECISION_PREPARE_END']);
    }

    // after 15s
    if (state.stage === 4 && vid.currentTime >= startTime + 15) {
      return dispatch(['DECISION_END']);
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
        <div className="decision-box" style={{ transform: `translateY(${state.showDecisionBox ? 0 : '100%'})` }}>
          {
            state.options.map((opt, i) => <Option key={i}>{ opt.value }</Option>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
