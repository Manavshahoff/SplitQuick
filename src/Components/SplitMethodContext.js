import React, { createContext, useContext, useState } from 'react';

const SplitMethodContext = createContext();

export const useSplitMethod = () => useContext(SplitMethodContext);

export const SplitMethodProvider = ({ children }) => {
  const [splitMethod, setSplitMethod] = useState('Paid by you and split equally');
  
  return (
    <SplitMethodContext.Provider value={{ splitMethod, setSplitMethod }}>
      {children}
    </SplitMethodContext.Provider>
  );
};
