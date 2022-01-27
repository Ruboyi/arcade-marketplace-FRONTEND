
import { useNavigate } from 'react-router';

// import imgDefault from '../../assets/imagen_articulo_por_defecto.jpg';
import './ProductsGrid.css';

function ProductsGrid({ products }) {

  const navigate = useNavigate();
  function onClickProduct(id) {
    navigate(`/products/${id}`);
  }

  let productsProcessed = products
  //sacar search params
  let actualUrl = window.location.href

  if (actualUrl.length > 38) {
    const search = window.location.href.slice(38)
    console.log(search);
    productsProcessed = products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
    console.log(productsProcessed);
  }


  const isProductsAnArray = Array.isArray(productsProcessed);

  return (
    <div>
      {isProductsAnArray ? (
        productsProcessed.map((product) => (
          <article
            key={product.idProduct}
            onClick={() => onClickProduct(product.idProduct)}
            className='grid-product'>
            <img
              className='img-grid'
              src={product.images[0]}
              alt='default-logo'
            />
            <div>
              <h1>{product.price}€</h1>
              <h2>{product.title}</h2>
              <h3>{product.category}</h3>
              <p>{product.description}</p>
            </div>
          </article>
        ))
      ) : (
        <h1>{products}</h1>
      )}
    </div>
  );
}

export default ProductsGrid;
