import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Badge,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Rating,
} from "@mui/material";
import "./productPage.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import SimpleImageSlider from "react-simple-image-slider";
import GoBack from "../../components/GoBack/GoBack";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ReportIcon from "@mui/icons-material/Report";
import SellerContact from "../../components/SellerContact/SellerContact";

const { REACT_APP_BACKEND_API } = process.env;

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});
  const [arrayImages, setArrayImages] = useState();
  const { idProduct } = useParams();
  const { userProfile, userSession } = useAuthorization();

  //TODO urls para botones
  //const urlContacto = "";
  //const urlDenuncia = "";
  //const urlPerfil = "";

  useEffect(() => {
    async function getProductInfo() {
      await axios.put(
        `${REACT_APP_BACKEND_API}products/times-visited/${idProduct}`
      );

      const responseData = await axios.get(
        `${REACT_APP_BACKEND_API}products/${idProduct}`
      );
      const productData = responseData.data.data;
      setProductInfo(productData);

      const productImages = productData.imagesURL.map((img) => {
        return {
          url: img,
        };
      });
      setArrayImages(productImages);

      const responseSeller = await axios.get(
        `${REACT_APP_BACKEND_API}users/user/${productData.idUser}`
      );
      setSellerInfo(responseSeller.data);
    }
    getProductInfo();
  }, [idProduct]);
  console.log(productInfo);

  return (
    <div>
      <GoBack />

      <Paper className="productPage-container">
        {productInfo && arrayImages ? (
          <div>
            <div className="slider">
              <SimpleImageSlider
                width={525}
                height={425}
                images={arrayImages}
                showBullets={true}
                showNavs={true}
              />
            </div>
            <div className="favorites-views">
              {userProfile.idUser !== productInfo.idUser && (
                <div>
                  {userSession && <FavoriteButton idProduct={idProduct} />}
                </div>
              )}
              <div className="favorites-views visibility">
                <IconButton>
                  <Badge badgeContent={productInfo.timesVisited}>
                    <VisibilityOutlinedIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </div>
              {userProfile.idUser !== productInfo.idUser && (
                <IconButton>
                  <ReportIcon fontSize="small" sx={{ color: "grey" }} />
                </IconButton>
              )}
            </div>
            <div>
              <h1>{productInfo.price}€</h1>
              <h2>{productInfo.title}</h2>
              <p>{productInfo.state}</p>
              <p>{productInfo.description}</p>
              <p>Localizacion: {productInfo.location}</p>
            </div>
            {userProfile.idUser !== productInfo.idUser && (
              <Paper elevation={3} className="user-card">
                <img
                  src={sellerInfo.image}
                  alt="foto de perfil"
                  className="profileImage"
                />
                <div className="name-rating">
                  <h2>{sellerInfo.nameUser} </h2>
                  <Rating name="read-only" value={4} readOnly />
                </div>
                {userSession && <SellerContact className="button-contacta" />}
              </Paper>
            )}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
}

export default ProductPage;
