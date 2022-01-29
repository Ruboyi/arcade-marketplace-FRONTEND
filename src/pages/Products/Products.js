import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
const { REACT_APP_BACKEND_API } = process.env;

function Products() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get(`${REACT_APP_BACKEND_API}products`);

      setProducts(response.data.data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      {products ? <ProductsGrid products={products} /> : <CircularProgress />}
    </div>
  );
}
export default Products;
