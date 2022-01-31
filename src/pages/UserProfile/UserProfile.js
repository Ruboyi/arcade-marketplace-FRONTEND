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
  const [productsImages, setProductsImages] = useState();
  const [reviews, setReviews] = useState()

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
        const productImages = filterProducts.map((product) => {
          return {
            url: product.images[0],
          };
        });
        setProductsImages(productImages);
      } catch (error) {
        console.log(error);
      }
    }
    async function getReviews() {
      try {
        const response = await axios.get(`${REACT_APP_BACKEND_API}reviews/${idUser}`)
        setReviews(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
    getProductsData();
    getReviews()
  }, [idUser]);

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
            {reviews ? (
              reviews.map((data) => (
                <Paper elevation={6} className="data-card" key={data.nameUser}>
                  {data.image ? (
                    <img src={data.image} alt="img" height={80} />
                  ) : (
                    <img src={defaultAvatar} alt="profile" height={80} />
                  )}
                  <div>
                    <h2>{data.nameUser}</h2>
                    <Rating name="read-only" value={data.rating} readOnly />
                    <p>{data.opinion}</p>
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
