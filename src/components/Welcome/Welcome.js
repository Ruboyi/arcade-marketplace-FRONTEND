import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Welcome({ setVisited }) {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Bienvenidos a Arcade Marketplace</h1>
      <Paper className='home-container'>
        <h2>
          Tu sitio perfecto para compra-venta de productos del mundo gaming
        </h2>
        <p>
          Aquí podrás encontrar todos tus productos favoritos para revivir
          buenas épocas y disfrutar de juegos que nunca se irán de nuestra
          memoria
        </p>
        <h3>CONSOLAS, VIDEOJUEGOS, ACCESORIO Y ARCADES.</h3>
        <p>o si tienes algo que ya no usas, véndelo al mejor precio!</p>
        <Link to={'/login'}>
          Pincha aquí si quieres iniciar tu aventura
        </Link>
      </Paper>
      <button onClick={() => navigate('/products')}>Ver productos</button>
    </main>
  );
}

export default Welcome;
