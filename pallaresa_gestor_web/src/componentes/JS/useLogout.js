import { useAdmin } from '../../context/AdminContext';
import { useUser } from '../../context/UserContext';

const useLogout = () => {
  const { setAdmin } = useAdmin();
  const { setUser } = useUser();

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    setAdmin(false);
    setUser(false);
  };

  return logout;
};

export default useLogout;