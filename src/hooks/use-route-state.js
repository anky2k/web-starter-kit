import React, { createContext, useContext } from 'react';
import canUseDom from 'can-use-dom';

const RouteStateContext = createContext({
  get: () => { }
});

export const RouteStateProvider = ({ children }) => {
  const get = () => {
    if (!canUseDom) {
      return {};
    }
    const path = window.location.pathname;
    const routeStateKey = path.replace(/\//g, '');
    const routeState = JSON.parse(window.sessionStorage.getItem(routeStateKey) || '{}');
    // window.sessionStorage.removeItem(routeStateKey);
    return routeState || {};
  };

  return (
    <RouteStateContext.Provider value={{ get }}>
      {children}
    </RouteStateContext.Provider>
  );
};

export default () => useContext(RouteStateContext);
