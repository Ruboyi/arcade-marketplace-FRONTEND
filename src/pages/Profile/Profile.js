import { CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const { REACT_APP_BACKEND_API } = process.env;

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  let userID = 7; // COMO CONSEGUIR EL USER ID DESDE EL ACCESS TOKEN O ALGO DE ESO???

  useEffect(() => {
    try {
      async function getUser() {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}users/user/${userID}`
        );
        setUser(response.data);
        console.log(response.data);
      }
      getUser();
    } catch (error) {
      console.log('ERROR', error);
    }
  }, []);

  return (
    <div className='profile'>
      <button className='goBack-button' onClick={() => navigate('/')}>
        Atras
      </button>
      {user ? (
        <Paper className='profile-paper'>
          <h1>{user.nameUser}</h1>
          <h2>{user.email}</h2>
          {user.image !== null ? (
            <img src={user.image} alt='profile' height={150} />
          ) : (
            <span className='default-image-profile'>IMAGEN DE PERFIL</span>
          )}
          <p>DESCRIPCION DESCRIPCION ESCRIPCION DESCRIPCION</p>
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
      </div>
    </div>
  );
}

export default Profile;
