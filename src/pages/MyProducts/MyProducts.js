
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { useAuthorization } from "../../hooks/useAuthorization";
import "./MyProducts.css";
const { REACT_APP_BACKEND_API } = process.env;

function Myproducts() {
  const { userSession, userProfile } = useAuthorization();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState();
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
      const response = await axios.get(
        `${REACT_APP_BACKEND_API}products/user/${idUser}`,
        config
      );
      console.log(response.data.data);
      setMyProducts(response.data.data);
    }
    getMyProducts();
  }, [userSession, navigate, idUser]);

  return (
    <div>
      <h1>Mis productos</h1>
      {myProducts ? (
        <ProductsGrid products={myProducts} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );

}

export default Myproducts;
