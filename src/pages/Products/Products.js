import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { getProducts } from "../../services/getData";
import './Products.css'

function Products() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    async function getData() {
      const products = await getProducts();
      setProducts(products);
    }
    getData();
  }, []);

  return (
    <div className="productsGrid">
      {products ? <ProductsGrid products={products} /> : <CircularProgress />}
    </div>
  );
}
export default Products;
