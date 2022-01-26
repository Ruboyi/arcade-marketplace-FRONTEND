import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './GoBack.css';

function GoBack() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }
  return (
    <button onClick={handleClick} className='goBack-button'>
      <ArrowBackIcon />
    </button>
  );
}

export default GoBack;
