import React, { createContext, useState, useContext } from "react";

// Creamos el contexto para Admin
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false); // Estado global de Admin

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext); // Hook para acceder al contexto