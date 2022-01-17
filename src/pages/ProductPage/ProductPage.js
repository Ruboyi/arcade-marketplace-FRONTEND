import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [productImg, setProductImg] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { idProduct } = useParams();

  useEffect(() => {
    async function getProductInfo() {
      setIsLoading(true);
      const responseData = await axios.get(
        `http://localhost:3000/api/v1/products/${idProduct}`
      );
      const responseImg = await axios.get(
        `http://localhost:3000/api/v1/products/images/${idProduct}`
      );
      setProductInfo(responseData.data.data);
      setProductImg(responseImg.data);
      setIsLoading(false);
    }

    getProductInfo();
  }, [idProduct]);

  console.log(productImg.data[0].nameImage);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <h1>{productInfo.title}</h1>
          <img src="productImg.data[0].nameImage" />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
