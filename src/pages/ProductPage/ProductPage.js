import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./productPage.css";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
const { REACT_APP_BACKEND_API, REACT_APP_BACKEND_PUBLIC } = process.env;

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});
  const [arrayImg, setArrayImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { idProduct } = useParams();

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

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div>
            {arrayImg.map((img) => {
              return (
                <div key={img.nameImage}>
                  <img
                    className="img-Product-productPage"
                    src={`${REACT_APP_BACKEND_PUBLIC}products/${idProduct}/${img.nameImage}`}
                    alt="img-product"
                  />
                </div>
              );
            })}
            <a href="{urlDenuncia}">Denuncia</a>
            <h1>{productInfo.title}</h1>
            <h2>{productInfo.price}</h2>
            <FavoriteButton idProduct={idProduct} />
            <a href="{urlContacto}">Contacta con el vendedor</a>
            <p>{productInfo.state}</p>
            <p>{productInfo.description}</p>
            <p>{productInfo.location}</p>
          </div>
          <div>
            <p>img de perfil???</p>
            <p>{sellerInfo.nameUser}</p>
            <a href="{urlPerfil}">Ir al Perfil</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
