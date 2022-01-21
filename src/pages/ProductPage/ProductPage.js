import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./productPage.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import SimpleImageSlider from "react-simple-image-slider";

const { REACT_APP_BACKEND_API, REACT_APP_BACKEND_PUBLIC } = process.env;



function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});
  const [arrayImg, setArrayImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { idProduct } = useParams();
  const { userProfile } = useAuthorization()

  //TODO urls para botones
  //const urlContacto = "";
  //const urlDenuncia = "";
  //const urlPerfil = "";

  useEffect(() => {
    async function getProductInfo() {
      setIsLoading(true);

      const responseData = await axios.get(
        `${REACT_APP_BACKEND_API}products/${idProduct}`
      );
      const productData = responseData.data.data;
      setProductInfo(productData);

      const responseSeller = await axios.get(
        `${REACT_APP_BACKEND_API}users/user/${productData.idUser}`
      );
      setSellerInfo(responseSeller.data);

      const responseImage = await axios.get(
        `${REACT_APP_BACKEND_API}products/images/${idProduct}`
      );
      const imgData = responseImage.data.data;

      setArrayImg(imgData);

      setIsLoading(false);
    }

    getProductInfo();
  }, [idProduct]);

  const images = arrayImg.map((img) => {
    return {
      url: `${REACT_APP_BACKEND_PUBLIC}products/${idProduct}/${img.nameImage}`,
    };
  });

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className="slider">
            <SimpleImageSlider
              width={325}
              height={325}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div>
          {userProfile.idUser !== productInfo.idUser &&
            <a href="{urlDenuncia}">Denuncia</a> }
            <h1>{productInfo.title}</h1>
            <h2>{productInfo.price}</h2>
            {userProfile.idUser !== productInfo.idUser &&
            <div>
              <FavoriteButton idProduct={idProduct} />
              <a href="{urlContacto}">Contacta con el vendedor</a>
            </div>}
            <p>{productInfo.state}</p>
            <p>{productInfo.description}</p>
            <p>{productInfo.location}</p>
          </div>
          {userProfile.idUser !== productInfo.idUser ?
          <div>
            <p>img de perfil???</p>
            <p>{sellerInfo.nameUser}</p>
            <a href="{urlPerfil}">Ir al Perfil</a>
          </div> : <a href='/update-product'>Editar</a>}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
