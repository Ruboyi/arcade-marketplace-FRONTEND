import { CircularProgress, Paper, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import defaultAvatar from "../../assets/defaultAvatar.png";
import SimpleImageSlider from "react-simple-image-slider";

const { REACT_APP_BACKEND_API } = process.env;

const data = [
  {
    userName: "Ruben",
    img: "https://thispersondoesnotexist.com/",
    rating: 5,
    assessment: "Muy puntual y amable, el producto en buen estado",
  },
  {
    userName: "Nacho",
    img: "https://thispersondoesnotexist.com/",
    rating: 3,
    assessment:
      "Como persona guay, pero el producto estaba un poquito en mal estado.",
  },
  {
    userName: "Aaron",
    img: "https://thispersondoesnotexist.com/",
    rating: 4,
    assessment:
      "Todo bien, el producto tal y como esperaba, llego un poco tarde pero dentro de lo normal",
  },
];

export default function UserProfile() {
  const { nameUser, idUser } = useParams();
  const [userData, setUserData] = useState();
  const [productsData, setProductsData] = useState();
  const [productsImages, setProductsImages] = useState();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}users/user/${idUser}`
        );
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getProductsData() {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
        const filterProducts = response.data.data.filter(
          (product) => product.idUser === Number(idUser)
        );
        setProductsData(filterProducts);
      } catch (error) {
        console.log(error);
      }
    }
    if (productsData) {
      const productImages = productsData.map((product) => {
        return {
          url: product.images[0],
        };
      });
      setProductsImages(productImages);
    }
    getUserData();
    getProductsData();
  }, [idUser]);
  console.log(productsData);

  return (
    <div>
      {userData ? (
        <Paper className="userProfile-container">
          <header className="header-userProfile">
            {userData.image ? (
              <img
                className="img-settings"
                src={userData.image}
                alt={`img-${nameUser}`}
                height={150}
              />
            ) : (
              <img
                className="img-settings"
                src={defaultAvatar}
                alt="profile"
                height={150}
              />
            )}
            <div>
              <h1>{nameUser}</h1>
              <Rating name="read-only" value={4} readOnly />
              <p>{userData.bio}</p>
            </div>
          </header>
          <main>
            <h1>Valoraciones</h1>
            {data ? (
              data.map((data) => (
                <Paper elevation={6} className="data-card" key={data.userName}>
                  {data.image ? (
                    <img src={data.img} alt="img" height={80} />
                  ) : (
                    <img src={defaultAvatar} alt="profile" height={80} />
                  )}
                  <div>
                    <h2>{data.userName}</h2>
                    <Rating name="read-only" value={data.rating} readOnly />
                    <p>{data.assessment}</p>
                  </div>
                </Paper>
              ))
            ) : (
              <CircularProgress />
            )}
            <h1>Productos</h1>
            {productsImages && (
              <div className="slider">
                <SimpleImageSlider
                  width={250}
                  height={250}
                  images={productsImages}
                  showBullets={true}
                  showNavs={true}
                />
              </div>
            )}
          </main>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
