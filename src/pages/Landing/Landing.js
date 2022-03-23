import { CircularProgress, Paper /* , Tabs */ } from '@mui/material';
//import Tab from "@mui/material/Tab";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import consolasLogo from '../../assets/gameboy.png';
import videojuegosLogo from '../../assets/cd.png';
import accesoriosLogo from '../../assets/gamepad.png';
import arcadesLogo from '../../assets/arcade.png';
// import { useNavigate } from 'react-router';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import { useAuthorization } from '../../hooks/useAuthorization';
import './Landing.css';
import logoCompleto from '../../assets/logosinfondo2.png';
import ProductCard from '../../components/ProductCard/ProductCard';
import ScrollButton from '../../components/ScrollButton/ScrollButton';

const { REACT_APP_BACKEND_API } = process.env;

export default function Landing() {
  //const [value, setValue] = useState(0);
  const [productsDataMostViewed, setProductsDataMostViewed] = useState();
  const [newProducts, setNewProducts] = useState();
  const [areProductsByZone, setAreProductsByZone] = useState(false);
  const { userProfile } = useAuthorization();
  // const navigate = useNavigate();

  useEffect(() => {
    async function getMostViewedProducts() {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}products/ordered-by-times-visited`
        );
        const products = response.data.data;
        setProductsDataMostViewed(products);
      } catch (error) {
        console.log(error);
      }
    }
    async function getNewProductsByZone() {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}products/new-products`
        );
        const products = response.data.data;
        if (userProfile) {
          const productsByZone = products.filter(
            (product) => product.province === userProfile.province
          );
          if (productsByZone.length === 0) {
            setAreProductsByZone(false);
            setNewProducts(products);
          } else {
            setAreProductsByZone(true);
            setNewProducts(productsByZone);
          }
        } else {
          setAreProductsByZone(false);
          setNewProducts(products);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getNewProductsByZone();
    getMostViewedProducts();
  }, [userProfile]);

  return (
    <div className='landing-container'>
      <Paper elevation={2}>
        <nav className='categories'>
          <div>
            <a href='/products?category=consolas'>
              <img src={consolasLogo} alt='consolas logo'></img>Consolas
            </a>
          </div>
          <div>
            <a href='/products?category=videojuegos'>
              <img src={videojuegosLogo} alt='videojuegos logo'></img>
              Videojuegos
            </a>
          </div>
          <div>
            <a href='/products?category=accesorios'>
              <img src={accesoriosLogo} alt='accesorios logo'></img>Accesorios
            </a>
          </div>
          <div>
            <a href='/products?category=arcades'>
              {' '}
              <img src={arcadesLogo} alt='arcades logo'></img>Arcades
            </a>
          </div>
        </nav>
      </Paper>
      <main>
        <div className='imageLanding'>
          <img src={logoCompleto} alt='logo Arcade Marketplace'></img>
        </div>
        <h1>Productos más buscados</h1>
        <section className='top-products-cards-section-container'>
          <ScrollButton
            direction={'left'}
            divContainer={'top-product-card-container'}
          />
          <div className='top-product-card-container'>
            {productsDataMostViewed ? (
              productsDataMostViewed.map((product) => (
                <ProductCard key={product.idProduct} product={product} />
                //   <Paper
                //     key={product.idProduct}
                //     elevation={0}
                //     className="product-card"
                //   >
                //     <img
                //       onClick={() => navigate(`/products/${product.idProduct}`)}
                //       src={product.images[0]}
                //       alt="product-img"
                //       width="180vh"
                //       height="150px"
                //     />
                //     <div className="product-card-header">
                //       <h2 className="title-product-card">{product.price}€</h2>
                //       <FavoriteButton
                //         className="favorite-button-product-card"
                //         idProduct={product.idProduct}
                //       />
                //     </div>
                //     <p>{product.title}</p>
                //   </Paper>
              ))
            ) : (
              <CircularProgress />
            )}
          </div>
          <ScrollButton
            direction={'right'}
            divContainer={'top-product-card-container'}
          />
        </section>
        <div className='landing-link-upload-product'>
          <Link to='/upload-product'>
            ¿Tienes alguno de estos? Click aquí para venderlo!
          </Link>
        </div>
        <section>
          {areProductsByZone ? (
            <h1>Últimos productos publicados en tu zona</h1>
          ) : (
            <h1>Últimos productos publicados</h1>
          )}
          <div className='new-product-card-container'>
            {newProducts ? (
              <ProductsGrid products={newProducts} />
            ) : (
              <CircularProgress />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
