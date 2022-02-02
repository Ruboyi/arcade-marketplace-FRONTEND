import { CircularProgress, Paper, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";

import "./Landing.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const { REACT_APP_BACKEND_API } = process.env;

export default function Landing() {
  const [value, setValue] = useState(0);
  const [productsImages, setProductsImages] = useState();
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
        const products = response.data.data;
        setProductsData(products);

        const productImages = products.map((product) => {
          return {
            url: product.images[0],
          };
        });
        setProductsImages(productImages);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className="landing-container">
        <Paper elevation={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label="Consolas" href="/drafts" />
            <LinkTab label="Arcades" href="/trash" />
            <LinkTab label="Videojuegos" href="/spam" />
            <LinkTab label="Acesorios" href="/spam" />
          </Tabs>
        </Paper>
        <main>
          <h1>Productos más buscados</h1>
          <div className="product-card-container">
            {productsData ? (
              productsData.map((product) => <ProductCard product={product} />)
            ) : (
              <CircularProgress />
            )}
          </div>
          <Link to="/upload-product">
            {" "}
            ¿Tienes alguno de estos? Véndelo Aquí!
          </Link>
          <h1>Ultimos Productos Publicados</h1>
          {productsImages ? (
            <div className="slider">
              <SimpleImageSlider
                width={350}
                height={325}
                images={productsImages}
                showBullets={true}
                showNavs={true}
              />
            </div>
          ) : (
            <CircularProgress />
          )}
        </main>
      </Paper>
    </div>
  );
}
