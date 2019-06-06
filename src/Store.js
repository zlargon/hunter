import React, { createContext, useReducer } from 'react';

// StoreContext
export const StoreContext = createContext({});

const initialState = {
  stage: 0,
  showDecisionBox: false,
  options: [
    { next: '001', value: 'option 1' },
    { next: '002', value: 'option 2' },
    { next: '003', value: 'option 3' },
    { next: '004', value: 'option 4' }
  ]
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
        showDecisionBox: true
      }

    case 'DECISION_START':
      return {
        ...state,
        stage: 2
      }

    case 'DECISION_SELECTED': {
      const { index, option } = payload;

      console.log('select option:', index);
      console.log(option);

      return {
        ...state,
        stage: 3
      }
    }

    case 'DECISION_PREPARE_END':
      return {
        ...state,
        stage: 4
      }

    case 'DECISION_END': {
      return {
        ...state,
        stage: 5,
        showDecisionBox: false
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
