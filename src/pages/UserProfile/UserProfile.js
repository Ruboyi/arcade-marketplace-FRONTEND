import { CircularProgress, Paper, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import defaultAvatar from "../../assets/defaultAvatar.png";
import SimpleImageSlider from "react-simple-image-slider";
import BadgeAvatars from "../../components/Avatar/Avatar";
import moment from "moment";

const { REACT_APP_BACKEND_API } = process.env;

export default function UserProfile() {
  const { nameUser, idUser } = useParams();
  const [userData, setUserData] = useState();
  const [productsImages, setProductsImages] = useState();
  const [reviews, setReviews] = useState();
  const [avgRating, setAvgRating] = useState();

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
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}reviews/${idUser}`
        );
        const responseData = response.data.data;

        setReviews(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    async function getRating() {
      try {
        const responseAvgRating = await axios.get(
          `${REACT_APP_BACKEND_API}reviews/rating/${idUser}`
        );
        if (responseAvgRating.data.data[0].avgRating > 0) {
          setAvgRating(Math.round(responseAvgRating.data.data[0].avgRating));
        } else {
          setAvgRating(null);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getUserData();
    getProductsData();
    getReviews();
    getRating();
  }, [idUser]);

  return (
    <div className="background-user-profile-page">
      {userData ? (
        <Paper className="userProfile-container" elevation={1}>
          <div className="header-userProfile" >
            {userData.image ? (
              <BadgeAvatars src={userData.image} isOnline={userData.isOnline} />
            ) : (
              <img
                className="img-settings"
                src={defaultAvatar}
                alt="profile"
                height={150}
              />
            )}
            {userData.lastLogin && !userData.isOnline && (
              <p className="moment-product">
                {" "}
                últ.vez {moment(userData.lastLogin).fromNow()}{" "}
              </p>
            )}
            <div>
              <h1>{nameUser}</h1>
              {avgRating ? (
                <Rating name="read-only" value={avgRating} readOnly />
              ) : (
                <Rating name="read-only" value={0} readOnly />
              )}
              <p>{userData.bio}</p>
            </div>
          </div>
          <main className="main-user">
            {reviews ? (
              reviews.map((data) => (
                <div key={data.nameUser}>
                  <h2 className="user-page-subtitle">Valoraciones</h2>
                  <div elevation={1} className="data-card">
                    {data.image ? (
                      <img src={data.image} alt="img" height={80} />
                    ) : (
                      <img src={defaultAvatar} alt="profile" height={80} />
                    )}
                    <div>
                      <h2 >{data.nameUser} <span className="ha-puntuado">ha puntuado:</span></h2>
                      <Rating name="read-only" value={data.rating} readOnly />
                      <p className="opinion">{data.opinion}</p>
                      <p className="moment-product align-moment">
                        Publicado {moment(data.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <CircularProgress />
            )}
            <h2 className="user-page-subtitle">Productos</h2>
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
