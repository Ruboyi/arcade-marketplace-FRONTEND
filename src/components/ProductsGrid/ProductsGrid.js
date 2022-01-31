import { Paper } from "@mui/material";
import { useNavigate } from "react-router";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

// import imgDefault from '../../assets/imagen_articulo_por_defecto.jpg';
import "./ProductsGrid.css";

function ProductsGrid({ products }) {
  const navigate = useNavigate();

  let productsProcessed = products;
  const actualUrl = window.location.href;

  if (actualUrl.includes("search")) {
    const position = actualUrl.search("search=") + 7;
    const search = actualUrl.slice(position);
    console.log(search);
    productsProcessed = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(productsProcessed);
  }

  const isProductsAnArray = Array.isArray(productsProcessed);

  return (
    <div>
      <Paper className="productGrid-card-container">
        {isProductsAnArray ? (
          productsProcessed.map((product) => (
            <Paper
              key={product.idProduct}
              elevation={6}
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
          <h1>{products}</h1>
        )}
      </Paper>
    </div>
  );
}

export default ProductsGrid;
