import axios from "axios";
import { useEffect, useState } from "react";
import AdminProductsGrid from "../../../components/AdminProductsGrid/AdminProductsGrid";
import MenuAdmin from "../../../components/MenuAdmin/MenuAdmin";
import { useAuthorization } from "../../../hooks/useAuthorization";
import "./AdminProductsPage.css";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminProductsPage() {
  const [productsData, setProductsData] = useState();
  const { userSession } = useAuthorization();

  async function getAllProducts() {
    const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
    setProductsData(response.data.data);
  }

  useEffect(() => {
    getAllProducts();
  }, [userSession]);

  console.log(productsData);
  return (
    <div>
      <MenuAdmin />
      <div className="Admin-grid-container">
        <AdminProductsGrid
          productsData={productsData}
          getAllProducts={getAllProducts}
        />
      </div>
    </div>
  );
}
