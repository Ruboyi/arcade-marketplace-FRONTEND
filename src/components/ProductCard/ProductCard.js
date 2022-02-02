import { Paper } from "@mui/material";
import { useNavigate } from "react-router";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Paper key={product.idProduct} elevation={6} className="product-card">
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
  );
}

export default ProductCard;
