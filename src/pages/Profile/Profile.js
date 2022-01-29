import { CircularProgress, Paper, Rating } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '../../hooks/useAuthorization';
import defaultAvatar from '../../assets/defaultAvatar.png';
import './Profile.css';
import GoBack from '../../components/GoBack/GoBack';

function Profile() {
  const navigate = useNavigate();
  const { userProfile, logout, userSession } = useAuthorization();

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
          {userProfile.image !== null ? (
            <img
              className='img-settings'
              src={userProfile.image}
              alt='profile'
              height={150}
            />
          ) : (
            <img
              className='img-settings'
              src={defaultAvatar}
              alt='profile'
              height={150}
            />
          )}
          <div>
            <h1>{userProfile.nameUser}</h1>
            <Rating name='read-only' value={4} readOnly />
            <p>{userProfile.bio}</p>
          </div>
        </Paper>
      ) : (
        <CircularProgress />
      )}

      <div className='buttons-container-profile'>
        <button onClick={() => navigate('/my-products')}>Mis productos</button>
        <button onClick={() => navigate('/my-products/purchase-orders')}>
          Solicitudes de compra de Mis Productos
        </button>
        <button onClick={() => navigate('/my-orders')}>Mis reservas</button>
        <button onClick={() => navigate('/my-reviews')}>Mis valoraciones</button>
        <button onClick={() => navigate('/settings')}>Ajustes</button>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Profile;
