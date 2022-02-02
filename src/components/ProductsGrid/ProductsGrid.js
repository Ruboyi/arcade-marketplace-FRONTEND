import { CircularProgress, Paper } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

// import imgDefault from '../../assets/imagen_articulo_por_defecto.jpg';
import "./ProductsGrid.css";

function ProductsGrid({ products }) {
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
          productsProcessed.map((product) => <ProductCard product={product} />)
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
}

export default ProductsGrid;
