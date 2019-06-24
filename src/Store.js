import React, { createContext, useReducer } from 'react';
import StoryFlow from './storyflow.js';

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
    nextSource: plot.next ? StoryFlow(plot.next) : {}
  }
}

// StoreContext
export const StoreContext = createContext({});

const initialState = {
  stage: 0,
  allowControls: true,
  showDecisionBox: false,
  selectedOption: 0,
  ...getCurrentAndNextPlot(StoryFlow())
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
        nextSource: StoryFlow(option)
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
