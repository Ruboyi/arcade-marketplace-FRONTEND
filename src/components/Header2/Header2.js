import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import searchIcon from '../../assets/loupe.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/joy.png';
import { useAuthorization } from '../../hooks/useAuthorization';
import axios from 'axios';
import { useState } from 'react';
import './Header2.css';
import { Button } from '@mui/material';
import theme from '../../theme/theme';
import heartHeader from '../../assets/heartHeader.png';
import uploadHeader from '../../assets/uploadHeader.png';
import PersonIcon from '@mui/icons-material/Person';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

/* const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})); */

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

export default function PrimarySearchAppBar() {
  const [, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isActualUrlProducts, setIsActualUrlProducts] = React.useState();
  const navigate = useNavigate();
  const [numbReviews, setNumbReviews] = useState();
  const [numbPurcharseOrders, setNumbPurcharseOrders] = useState();
  const { REACT_APP_BACKEND_API } = process.env;
  const { userSession, userProfile } = useAuthorization();
  const { idUser } = userProfile;
  let actualUrl = window.location.href;

  React.useEffect(() => {
    setIsActualUrlProducts(
      actualUrl.startsWith('http://localhost:3001/products') ||
        actualUrl.startsWith('http://localhost:3001/my-favorites')
    );

    //! Work
    async function getReviews() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userSession}`
          }
        };
        if (idUser) {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}reviews/${idUser}`,
            config
          );

          const reviews = response.data.data;
          const reviewsFiltered = reviews.filter((review) => review.isChecked === 0);
          setNumbReviews(reviewsFiltered.length);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    //!

    async function getPurchaseOrders() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userSession}`
          }
        };
        if (idUser) {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}orders/sellerUser/${idUser}`,
            config
          );
          const orders = response.data.data;
          const ordersFiltered = orders.filter((order) => order.isChecked === 0);
          setNumbPurcharseOrders(ordersFiltered.length);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReviews();
    getPurchaseOrders();
  }, [
    REACT_APP_BACKEND_API,
    actualUrl,
    idUser,
    userSession,
    numbPurcharseOrders,
    numbReviews
  ]);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ zIndex: 12000 }}>
      <MenuItem onClick={() => navigate('/my-reviews')}>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={numbReviews} color='error'>
            <StarIcon />
          </Badge>
        </IconButton>
        <p>Valoraciones</p>
      </MenuItem>
      <MenuItem onClick={() => navigate('/my-products/purchase-orders')}>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'>
          <Badge badgeContent={numbPurcharseOrders} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Solicitudes</p>
      </MenuItem>
      <MenuItem onClick={toProfile}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        elevation={2}
        position='fixed'
        className='header'
        sx={{ zIndex: '12000', backgroundColor: 'white' }}>
        <Toolbar>
          <div>
            <Typography variant='h6' noWrap component='div'>
              <img
                className='small-logo'
                src={logo}
                alt='small-logo'
                height='60px'
                onClick={() => navigate('/landing')}
              />
            </Typography>
          </div>
          <Search>
            <StyledInputBase
              sx={{
                backgroundColor: '#e4f1ff',
                borderRadius: '8px',
                color: '#051149',
                height: '27px'
              }}
              className='searchBar'
              placeholder='Buscar'
              value={searchParams.get('search') || ''}
              onChange={(event) => {
                let search = event.target.value;
                if (search) {
                  setSearchParams({ search });
                } else {
                  setSearchParams({});
                }
              }}
            />
          </Search>
          {isActualUrlProducts ? (
            <IconButton onClick={() => window.location.reload(false)}>
              <img className='search-icon' src={searchIcon} alt='search-icon' />
            </IconButton>
          ) : (
            <IconButton onClick={() => navigate(`/products?${searchParams}`)}>
              <img className='search-icon' src={searchIcon} alt='search-icon' />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {userSession ? (
            <>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex', alignItems: 'center' }
                }}>
                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                  onClick={() => navigate('/my-favorites')}>
                  <img src={heartHeader} alt='favorites' className='iconHeader' />
                </IconButton>

                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                  onClick={() => navigate('/my-reviews')}>
                  <Badge badgeContent={numbReviews} color='error'>
                    <StarIcon sx={{ color: '#051149' }} />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  aria-label='show 17 new notifications'
                  color='inherit'
                  onClick={() => navigate('/my-products/purchase-orders')}>
                  <Badge badgeContent={numbPurcharseOrders} color='error'>
                    <NotificationsIcon sx={{ color: '#051149' }} />
                  </Badge>
                </IconButton>
                <IconButton
                  size='large'
                  edge='end'
                  onClick={toProfile}
                  color='inherit'>
                  <AccountCircle sx={{ color: '#051149' }} />
                </IconButton>
                <IconButton
                  className='uploadIconButton'
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                  onClick={() => navigate('/upload-product')}>
                  <span className='uploadText'>Subir Producto</span>
                  <img
                    src={uploadHeader}
                    alt='upload product'
                    className='iconHeader'
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'>
                  <MoreIcon sx={{ color: '#051149' }} />
                </IconButton>
              </Box>
            </>
          ) : (
            <Button
              className='loginButton'
              variant='contained'
              onClick={() => navigate('/login')}
              theme={theme}>
              <PersonIcon />
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}
