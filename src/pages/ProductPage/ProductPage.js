import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Paper } from "@mui/material";
import "./productPage.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import SimpleImageSlider from "react-simple-image-slider";
import GoBack from "../../components/GoBack/GoBack";

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
              <p>👀{productInfo.timesVisited}</p>
            </div>
            {userSession && (
              <a href="{urlContacto}">Contacta con el vendedor</a>
            )}
            <div>
              {userProfile.idUser !== productInfo.idUser && (
                <a href="{urlDenuncia}">Denuncia</a>
              )}
              <h1>{productInfo.title}</h1>
              <h2>{productInfo.price}</h2>
              <p>{productInfo.state}</p>
              <p>{productInfo.description}</p>
              <p>{productInfo.location}</p>
            </div>
            {userProfile.idUser !== productInfo.idUser ? (
              <div>
                <img
                  src={sellerInfo.image}
                  alt="foto de perfil"
                  className="profileImage"
                />
                <p>{sellerInfo.nameUser}</p>
                <a href="{urlPerfil}">Ir al Perfil</a>
              </div>
            ) : (
              <a href={`/update-product/${idProduct}`}>Editar</a>
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
