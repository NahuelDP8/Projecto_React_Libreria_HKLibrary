import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  return (
    <AppContext.Provider value={{ selectedAuthor, setSelectedAuthor }}>
      {children}
    </AppContext.Provider>
  );
};