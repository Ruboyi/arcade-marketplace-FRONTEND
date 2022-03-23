import './NotFound.css';
import img404 from '../../assets/404.jpg';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

function NotFoundComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/landing');
    }, 5000);
  }, [navigate]);

  return (
    <div className='img-not-found-background'>
      <img className='img-NotFound' src={img404} alt='img404' />
    </div>
  );
}

export default NotFoundComponent;
