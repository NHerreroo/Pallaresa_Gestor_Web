import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useUser } from '../../context/UserContext';

const useLogout = () => {
  const { setAdmin } = useAdmin();
  const { setUser } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    setAdmin(false);
    setUser(false);
    setShowConfirmation(false); // Close the modal after logout
  };

  const confirmLogout = () => {
    setShowConfirmation(true); // Show the confirmation modal
  };

  const cancelLogout = () => {
    setShowConfirmation(false); // Hide the confirmation modal
  };

  return { confirmLogout, logout, showConfirmation, cancelLogout };
};

export default useLogout;