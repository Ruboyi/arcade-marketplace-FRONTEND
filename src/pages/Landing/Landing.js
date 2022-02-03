import { CircularProgress, Paper/* , Tabs */ } from "@mui/material";
//import Tab from "@mui/material/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import consolasLogo from '../../assets/gameboy.png'
import videojuegosLogo from '../../assets/cd.png'
import accesoriosLogo from '../../assets/gamepad.png'
import arcadesLogo from '../../assets/arcade.png'

import "./Landing.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const { REACT_APP_BACKEND_API } = process.env;

export default function Landing() {

  //const [value, setValue] = useState(0);
  const [productsDataMostViewed, setProductsDataMostViewed] = useState();
  const [newProductsImages, setNewProductsImages] = useState()
  const navigate = useNavigate();


  useEffect(() => {
    async function getMostViewedProducts() {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API}products/ordered-by-times-visited`);
        const products = response.data.data;
        setProductsDataMostViewed(products);

        products.map((product) => {
          return {
            url: product.images[0],
          };
        });

      } catch (error) {
        console.log(error);
      }
    }
    async function getNewProducts() {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API}products/new-products`);
        const products = response.data.data;


        const productImages = products.map((product) => {
          return {
            url: product.images[0],
          };
        });
        setNewProductsImages(productImages);
      } catch (error) {
        console.log(error);
      }
    }
    getNewProducts()
    getMostViewedProducts();
  }, []);

  return (
    <div className="landing-container">
      {/* <Paper className="landing-container"> */}
      <Paper elevation={2}>
        <nav className="categories">
          <div>
            <a href="/products?category=consolas"><img src={consolasLogo} alt="consolas logo"></img>Consolas</a>
          </div>
          <div>
            <a href="/products?category=videojuegos"><img src={videojuegosLogo} alt="videojuegos logo"></img>Videojuegos</a>
          </div>
          <div>
            <a href="/products?category=accesorios"><img src={accesoriosLogo} alt="accesorios logo"></img>Accesorios</a>
          </div>
          <div >
            <a href="/products?category=arcades"> <img src={arcadesLogo} alt="arcades logo"></img>Arcades</a>
          </div>
        </nav>
        {/* <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Consolas" href="/drafts" />
          <LinkTab label="Arcades" href="/trash" />
          <LinkTab label="Videojuegos" href="/spam" />
          <LinkTab label="Acesorios" href="/spam" />
        </Tabs> */}
      </Paper>
      <main>
        <h1>Productos mas buscados</h1>
        <div className="product-card-container">
          {productsDataMostViewed ? (
            productsDataMostViewed.map((product) => (
              <Paper
                key={product.idProduct}
                elevation={0}
                className="product-card"
              >
                <img
                  onClick={() => navigate(`/products/${product.idProduct}`)}
                  src={product.images[0]}
                  alt="product-img"
                  width="180vh"
                  height="150px"
                />
                <div className="product-card-header">
                  <h2 className="title-product-card">{product.price}€</h2>
                  <FavoriteButton
                    className="favorite-button-product-card"
                    idProduct={product.idProduct}
                  />
                </div>
                <p>{product.title}</p>
              </Paper>
            ))
          ) : (
            <CircularProgress />
          )}
        </div>
        <Link to="/upload-product">
          {" "}
          ¿Tienes alguno de estos? Clica aquí para venderlo!
        </Link>
        <h1>Ultimos Productos Publicados</h1>
        {newProductsImages ? (
          <div className="slider">
            <SimpleImageSlider className={'rsis-container'}
              width={250}
              height={225}
              images={newProductsImages}
              showBullets={false}
              showNavs={true}
            />
          </div>
        ) : (
          <CircularProgress />
        )}
      </main>
      {/* </Paper> */}
    </div>
  );
}
