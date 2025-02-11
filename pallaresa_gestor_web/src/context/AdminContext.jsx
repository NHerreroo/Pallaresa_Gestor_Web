import React, { createContext, useState, useContext } from "react";

// Creamos el contexto para Admin
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [Admin, setAdmin] = useState(false); // Estado global de Admin

  return (
    <AdminContext.Provider value={{ Admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext); // Hook para acceder al contexto