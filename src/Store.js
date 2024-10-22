import React, { createContext, useReducer } from 'react';
import storyflow from './storyflow.json';

const toSecond = (timeStr) => {
  try {
    const t = timeStr.split(':').map(parseFloat);
    return t[0] * 24 + t[1] * 60 + t[2];
  } catch (e) {
    return null;
  }
}

const getStory = (name = 'begin') => {
  const plot = {
    name,
    ...storyflow['default'],
    ...storyflow[name]
  };

  plot.start_time  = toSecond(plot.start_time);
  plot.end_time    = toSecond(plot.end_time);
  plot.select_time = plot.next.length > 1 ? plot.select_time : 0;
  return plot;
};

const debugPlot = (plot) => {
  console.group('🎬', plot.name);
  console.log('video_name:', plot.video.split('/').pop());
  console.log('start_time:', plot.start_time);
  console.log('end_time:', plot.end_time);
  console.log('select_time:', plot.select_time);
  console.log('prepare_time:', plot.end_time - plot.select_time);
  console.log('next:', plot.next);
  console.groupEnd();
}

const getCurrentAndNextPlot = (plot) => {
  debugPlot(plot);
  return {
    currentSource: plot,
    nextSource: plot.next.length > 0 ? getStory(plot.next[0]) : null
  }
}

// StoreContext
export const StoreContext = createContext({});

const initialState = {
  stage: 0,
  allowControls: true,
  showDecisionBox: false,
  selectedOption: 0,
  ...getCurrentAndNextPlot(getStory())
};

// Reducer
const reducer = (state, action) => {
  const [type, payload] = action;
  console.log(`%c 🚀 ${type} `, 'background: black; color: yellow; font-weight : bold');

  switch (type) {
    case 'DECISION_PREPARE':
      return {
        ...state,
        stage: 1,
        allowControls: false
      }

    case 'DECISION_START':
      return {
        ...state,
        stage: 2,
        showDecisionBox: true
      }

    case 'DECISION_SELECTED':
      return {
        ...state,
        stage: 3,
        selectedOption: payload
      }

    case 'DECISION_PREPARE_END': {
      const optionIndex = state.selectedOption;
      const option = state.currentSource.next[optionIndex];

      return {
        ...state,
        stage: 4,
        nextSource: getStory(option)
      }
    }

    case 'NEXT_PLOT': {
      return {
        ...state,
        stage: 0,
        selectedOption: 0,
        allowControls: true,
        showDecisionBox: false,
        ...getCurrentAndNextPlot(state.nextSource)
      }
    }

    case 'VIDEO_END': {
      return initialState;
    }

    default:
      throw new Error(`Unknown Action Type: ${type}`);
  }
}

// Store
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}

export default Store;
