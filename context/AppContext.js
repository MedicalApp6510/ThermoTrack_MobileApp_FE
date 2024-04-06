// AppContext.js
import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tempUnit, setTempUnit] = useState('C');

  return (
    <AppContext.Provider value={{ tempUnit, setTempUnit }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;