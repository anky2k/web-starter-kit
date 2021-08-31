import {
  createContext, useContext, useState
} from 'react';
import Snackbar from '../components/commons/snackbar';

const SnackbarContext = createContext(
  {
    showSnackbar: () => { },
    hideSnackbar: () => { }
  }
);

export const SnackbarProvider = ({ children }) => {
  const [state, setState] = useState({ visibility: false });

  const showSnackbar = data => {
    setState({
      visibility: true,
      message: data.message,
      type: data instanceof Error ? 'error' : data.type
    });
  };

  const hideSnackbar = () => {
    setState({
      message: state.message,
      visibility: false
    });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        hide={hideSnackbar}
        visible={state.visibility}
        message={state.message}
        type={state.type}
      />
    </SnackbarContext.Provider>
  );
};

export default () => useContext(SnackbarContext);
