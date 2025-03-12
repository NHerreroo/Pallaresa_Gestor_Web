import { Outlet, Navigate } from "react-router-dom";
import { useAdmin } from './AdminContext';
import { useUser } from './UserContext';

const ProtectedRoutesAdmin = () => {
  const { admin } = useAdmin();
  return admin ? <Outlet /> : <Navigate to="/admin" />;
};

const ProtectedRoutesDocente = () => {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/docente" />;
};

export { ProtectedRoutesDocente, ProtectedRoutesAdmin };