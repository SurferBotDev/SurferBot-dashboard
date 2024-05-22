import React, { createContext, useContext, useState } from 'react';
import LoadModals from '../components/modals';
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState({});

  const openModal = (name) => {
    setModals((prevModals) => ({
      ...prevModals,
      [name]: true,
    }));
  };

  const closeModal = (name) => {
    setModals((prevModals) => ({
      ...prevModals,
      [name]: false,
    }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
    <LoadModals />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
