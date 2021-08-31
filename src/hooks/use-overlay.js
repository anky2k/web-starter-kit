import React, {
  createContext, useContext, useState
} from 'react';

import OverLay from '../components/commons/overlay';

const OverLayContext = createContext({
  hide: () => { },
  show: () => { }
});

export const OverLayProvider = ({ children }) => {
  const [state, setState] = useState({
    visible: false,
    title: ''
  });

  const show = () => {
    setState({
      visible: true
    });
  };

  const hide = () => {
    setState({
      visible: false
    });
  };

  return (
    <OverLayContext.Provider value={{ show, hide }}>
      {children}
      <OverLay visible={state.visible} />
    </OverLayContext.Provider>
  );
};

export default () => useContext(OverLayContext);
