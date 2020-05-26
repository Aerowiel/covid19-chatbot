import React from 'react';

let SnackbarContext = React.createContext();

const initialState = {
  isOpen: false,
  autoHideDuration: 6000,
  message: '',
  variant: '',
}

const reducer = (state, action) => {
  switch(action.type) {
    case "CONFIG_SNACKBAR":
      return {
        ...state,
        isOpen: true,
        autoHideDuration: action.payload.autoHideDuration,
        message: action.payload.message,
        variant: action.payload.variant,
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state;
  }
};

const SnackbarContextProvider = (props) => {

  const [snackbarState, snackbarDispatch] = React.useReducer(reducer, initialState);

  const values = {
    snackbarState,
    snackbarDispatch
  }

  return (
    <SnackbarContext.Provider value={values}>{props.children}</SnackbarContext.Provider>
  );
}

const SnackbarContextConsumer = SnackbarContext.Consumer;

export { SnackbarContext, SnackbarContextProvider, SnackbarContextConsumer }
