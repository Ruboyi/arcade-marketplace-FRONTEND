import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./productPage.css";

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});
  //const [urlImg, setUrlImg] = useState("");
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
        `http://localhost:3000/api/v1/products/${idProduct}`
      );
      const productData = responseData.data.data;
      setProductInfo(productData);

      const responseSeller = await axios.get(
        `http://localhost:3000/api/v1/users/${productData.idUser}`
      );
      setSellerInfo(responseSeller.data);

      //TODO setear el url de la img
      /* const responseImage = await axios.get(
        `http://localhost:3000/api/v1/products/images/${idProduct}`
      );
      setUrlImg(
        `arcade-marketplace-BACKEND/public/products/${idProduct}/${responseImage.data.data[0].nameImage}`
      ); */

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
            <img src="{urlImg}" alt="error" />
            <a href="{urlDenuncia}">Denuncia</a>
            <h1>{productInfo.title}</h1>
            <h2>{productInfo.price}</h2>
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
