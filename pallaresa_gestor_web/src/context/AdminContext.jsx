import React, { createContext, useState, useContext, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    // Recuperar el estado de admin del localStorage al inicializar
    const savedAdmin = localStorage.getItem("admin");
    return savedAdmin ? JSON.parse(savedAdmin) : false;
  });

  useEffect(() => {
    // Guardar el estado de admin en localStorage cada vez que cambie
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);