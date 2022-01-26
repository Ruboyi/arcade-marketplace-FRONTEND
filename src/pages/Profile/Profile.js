import { CircularProgress, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAuthorization';
import defaultAvatar from '../../assets/defaultAvatar.png';
import './Profile.css';
import GoBack from '../../components/GoBack/GoBack';

function Profile() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, userSession, setUserSession } =
    useAuthorization();

  function logOut() {
    setUserProfile(false);
    setUserSession(null);
    sessionStorage.removeItem('userSession');
    navigate('/login');
  }

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }
  }, [userSession, navigate]);
  // console.log(userProfile);
  return (
    <div className='profile'>
      <GoBack />
      {userProfile ? (
        <Paper className='profile-paper'>
          <h1>{userProfile.nameUser}</h1>
          <h2>{userProfile.email}</h2>
          <h3>{userProfile.phone}</h3>
          {userProfile.image !== null ? (
            <img src={userProfile.image} alt='profile' height={150} />
          ) : (
            <img src={defaultAvatar} alt='profile' height={150} />
          )}
          <p>{userProfile.bio}</p>
        </Paper>
      ) : (
        <CircularProgress />
      )}

      <div className='buttons-container-profile'>
        <button onClick={() => navigate('/my-products')}>
          Mis productos
        </button>
        <button onClick={() => navigate('/my-orders')}>
          Mis reservas
        </button>
        <button onClick={() => navigate('/my-reviews')}>
          Mis valoraciones
        </button>
        <button onClick={() => navigate('/settings')}>Ajustes</button>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;
