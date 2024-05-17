import React, { createContext, useContext, useState, useEffect } from 'react';
import SurferBotAPI from '../api/SurferBotAPI';

const SurferBotContext = createContext();

export const SurferBotProvider = ({ children, baseURL, password }) => {
  const [api] = useState(new SurferBotAPI(baseURL, password));
  return (
    <SurferBotContext.Provider value={{ api }}>
      {children}
    </SurferBotContext.Provider>
  );
};

export const useSurferBot = () => useContext(SurferBotContext);
