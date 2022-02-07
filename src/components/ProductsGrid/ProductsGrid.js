import { CircularProgress } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

// import imgDefault from '../../assets/imagen_articulo_por_defecto.jpg';
import "./ProductsGrid.css";

function ProductsGrid({ products }) {
  let productsProcessed = products;
  const actualUrl = window.location.href;

  if (actualUrl.includes("search")) {
    const position = actualUrl.search("search=") + 7;
    let search = actualUrl.slice(position);
    if (search.includes('+')) {
      search = search.replace('+', ' ')
    }
    console.log(search);
    productsProcessed = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(productsProcessed);
  }
  if (actualUrl.includes("category")) {
    const position = actualUrl.search("category=") + 9;
    let search = actualUrl.slice(position);
    console.log(search);
    productsProcessed = products.filter((product) =>
      product.category.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(productsProcessed);
  }

  const isProductsAnArray = Array.isArray(productsProcessed);

  return (
    <div className="productGrid-card-container">

      {isProductsAnArray ? (
        productsProcessed.map((product) => <ProductCard key={product.idProduct} product={product} />)
      ) : (
        <CircularProgress />
      )}

    </div>
  );
}

export default ProductsGrid;
