import React from 'react';

let ConfirmationModalContext = React.createContext();

const initialState = {
  isOpen: false,
  title: '',
  message: '',
  confirmationButtonText: 'Confirmer',
  declinationButtonText: 'Annuler',
  isConfirmed: false,
  //variant: '',
}

const reducer = (state, action) => {
  switch(action.type) {
    case "CONFIG_MODAL":
      return {
        ...state,
        isOpen: true,
        title: action.payload.title,
        message: action.payload.message,
        confirmationButtonText: action.payload.confirmationButtonText,
        declinationButtonText: action.payload.declinationButtonText,
        action: action.payload.action,
        //variant: action.payload.variant,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state;
  }
};

const ConfirmationModalContextProvider = (props) => {

  const [modalState, modalDispatch] = React.useReducer(reducer, initialState);

  const values = {
    modalState,
    modalDispatch,
  }

  return (
    <ConfirmationModalContext.Provider value={values}>{props.children}</ConfirmationModalContext.Provider>
  );
}

const ConfirmationModalConsumer = ConfirmationModalContext.Consumer;

export { ConfirmationModalContext, ConfirmationModalContextProvider, ConfirmationModalConsumer }
