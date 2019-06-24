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
  const plot = storyflow[name];
  return {
    ...storyflow['default'],
    name,
    ...plot,
    start_time: toSecond(plot.start_time),
    end_time: toSecond(plot.end_time)
  }
};

const debugPlot = (plot) => {
  console.group(plot.name);
  console.log('start_time:', plot.start_time);
  console.log('end_time:', plot.end_time);
  console.log('select_time:', plot.select_time);
  console.log('next:', plot.next);
  console.log('options:', plot.options);
  console.groupEnd();
}

const getCurrentAndNextPlot = (plot) => {
  debugPlot(plot);
  return {
    currentSource: plot,
    nextSource: plot.next ? getStory(plot.next) : {}
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
debugPlot(initialState.currentSource);

// Reducer
const reducer = (state, action) => {
  const [type, payload] = action;
  console.log(type);

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
      const option = state.currentSource.options[optionIndex];

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
