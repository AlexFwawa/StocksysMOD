import { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [allowDecimals, setAllowDecimals] = useState(() => {
    return localStorage.getItem('allowDecimals') === 'true';
  });

  const [lowStockThreshold, setLowStockThreshold] = useState(() => {
    return Number(localStorage.getItem('lowStockThreshold')) || 20;
  });

  useEffect(() => {
    localStorage.setItem('allowDecimals', allowDecimals);
  }, [allowDecimals]);

  useEffect(() => {
    localStorage.setItem('lowStockThreshold', lowStockThreshold);
  }, [lowStockThreshold]);

  return (
    <SettingsContext.Provider value={{
      allowDecimals,
      setAllowDecimals,
      lowStockThreshold,
      setLowStockThreshold
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe usarse dentro de un SettingsProvider');
  }
  return context;
};
