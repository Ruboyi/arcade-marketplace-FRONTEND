import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

function Products() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      console.log(response.data.data);

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
