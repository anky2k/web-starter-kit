import React, {
  createContext, useContext, useState
} from 'react';
import CentralLoader from '../components/commons/central-loader';
import useOverlay from './use-overlay';

const LoaderContext = createContext({
  showLoader: () => { },
  hideLoader: () => { }
});

export const LoaderProvider = ({ children }) => {
  const [state, setState] = useState({ visible: false });
  const { show: showOverLay, hide: hideOverLay } = useOverlay();

  const showLoader = overlay => {
    overlay && showOverLay();
    setState({
      visible: true,
      overlay
    });
  };

  const hideLoader = () => {
    state.overlay && hideOverLay();
    setState({
      visible: false
    });
  };

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {state.visible && (<CentralLoader />)}
    </LoaderContext.Provider>
  );
};

export default () => useContext(LoaderContext);
