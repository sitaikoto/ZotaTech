import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h1 className="profile-greeting">Здравствуйте, {user.login}</h1>
        <div className="profile-divider"></div>
        <button className="logout-button" onClick={handleLogout}>
          Выход
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
