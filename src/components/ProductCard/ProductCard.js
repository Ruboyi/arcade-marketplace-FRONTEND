import { Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div key={product.idProduct} elevation={0} className='product-card'>
      <div className='product-card-image-container'>
        <img
          onClick={() => navigate(`/products/${product.idProduct}`)}
          src={product.images[0]}
          alt='product-img'
          className='product-card-img'
        />
      </div>
      <div className='product-card-header'>
        <h2 className='title-product-card'>{product.price}€</h2>
        <FavoriteButton
          className='favorite-button-product-card'
          idProduct={product.idProduct}
        />
      </div>
      <p className='product-card-title'>{product.title}</p>
    </div>
  );
}

export default ProductCard;
