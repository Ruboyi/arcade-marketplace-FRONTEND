import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MenuProfile from "../../components/MenuProfile/MenuProfile";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { useAuthorization } from "../../hooks/useAuthorization";
import "./MyProducts.css";
const { REACT_APP_BACKEND_API } = process.env;

function Myproducts() {
  const { userSession, userProfile } = useAuthorization();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState();
  const [myProductsLengthZero, setMyProductsLengthZero] = useState(false);
  const { idUser } = userProfile;

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
    async function getMyProducts() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      if (idUser) {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}products/user/${idUser}`,
          config
        );
        if (response.data.data.length === 0) {
          setMyProductsLengthZero(true);
        }
        setMyProducts(response.data.data);
      }
    }
    getMyProducts();
  }, [userSession, navigate, idUser]);

  return (
    <div className="my-products-container">
      <MenuProfile />
      <div>
        <h1>Mis productos</h1>
        {myProducts ? (
          <ProductsGrid products={myProducts} />
        ) : (
          <CircularProgress />
        )}
        {myProductsLengthZero && <h2>Aún no has publicado ningún producto!</h2>}
      </div>
    </div>
  );
}

export default Myproducts;
