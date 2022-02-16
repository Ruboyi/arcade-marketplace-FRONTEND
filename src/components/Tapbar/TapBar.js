import { Link } from 'react-router-dom';
import './TapBar.css';
import home from '../../assets/hut.png'
import add from '../../assets/add.png'
import heart from '../../assets/heart.png';
//import { useAuthorization } from '../../hooks/useAuthorization';

function TapBar() {
  //const { userProfile, userSession } = useAuthorization();

  return (
    <nav className='tapBar-navigation'>
      <div>
        <Link to={'/landing'}>
          <img src={home} alt='home' className='homeIcon' />
        </Link>
      </div>
      <div>
        <Link to={'/my-favorites'}>
          <img src={heart} alt='heart' className='heartIcon' />
        </Link>
      </div>
      <div>
        <Link to={'/upload-product'}>
          <img src={add} alt='add' className='addIcon' />
        </Link>
      </div>
      {/* <div>
        {!userSession ? (
          <Link to={'/login'}>
            {' '}
            <Icon className={'login-icon'}>account_circle</Icon>{' '}
          </Link>
        ) : (
          <Link to={'/profile'}>
            {userProfile && userProfile.image ? (
              <img
                className='img-tapbar'
                src={userProfile.image}
                alt='profile'
                height={40}
              />
            ) : (
              <Icon className={'login-icon'}>account_circle</Icon>
            )}
          </Link>
        )}
      </div> */}
    </nav>
  );
}

export default TapBar;
