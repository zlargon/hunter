import React, { createContext, useReducer } from 'react';
import StoryFlow from './storyflow.js';

// StoreContext
export const StoreContext = createContext({});

const initialState = {
  stage: 0,
  allowControls: true,
  showDecisionBox: false,
  selectedOption: 0,
  currentSource: StoryFlow['001'],
  nextSource: {}
};

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
      const nextSource = StoryFlow[option.next];

      return {
        ...state,
        stage: 4,
        nextSource
      }
    }

    case 'DECISION_END': {
      return {
        ...state,
        stage: 0,
        selectedOption: 0,
        allowControls: true,
        showDecisionBox: false,
        currentSource: state.nextSource,
        nextSource: {}
      }
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
