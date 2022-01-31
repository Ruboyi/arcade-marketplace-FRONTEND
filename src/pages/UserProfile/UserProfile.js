import { CircularProgress, Paper, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import defaultAvatar from "../../assets/defaultAvatar.png";
import SimpleImageSlider from "react-simple-image-slider";

const { REACT_APP_BACKEND_API } = process.env;


export default function UserProfile() {
  const { nameUser, idUser } = useParams();
  const [userData, setUserData] = useState();
  const [productsImages, setProductsImages] = useState();
  const [reviews, setReviews] = useState()
  const [avgRating, setAvgRating] = useState()

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
        const responseData = response.data.data

        setReviews(responseData);
        if (responseData.length > 1) {

          const reducer = (previousValue, currentValue) => previousValue.rating + currentValue.rating;
          const totalRating = responseData.reduce(reducer)

          setAvgRating(Math.round(totalRating / responseData.length))
        } else if (responseData.length === 1) {
          setAvgRating(responseData[0].rating)
        } else { setAvgRating('No hay valoraciones') }
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
      {userData && avgRating ? (
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
              {avgRating > 0 ? <Rating name='read-only' value={avgRating} readOnly /> : <h2>No hay reviews</h2>}
              {avgRating > 0 && reviews.length > 1 ? <h3>{reviews.length} Valoraciones</h3> : null}
              {avgRating > 0 && reviews.length === 1 ? <h3>1 Valoracion</h3> : null}
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
