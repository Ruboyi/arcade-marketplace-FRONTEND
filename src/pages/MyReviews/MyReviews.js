import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import MenuProfile from "../../components/MenuProfile/MenuProfile";
import "./MyReviews.css";

function MyReviews() {
  const [reviews, setReviews] = useState();
  const [error, setError] = useState();

  const { userProfile, userSession } = useAuthorization();
  const { idUser } = userProfile;
  const navigate = useNavigate();
  const { REACT_APP_BACKEND_API } = process.env;

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }

    async function setCheckReviewNotifications() {
      const data = {};
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      await axios.put(
        `${REACT_APP_BACKEND_API}reviews/${idUser}`,
        data,
        config
      );
    }

    async function getReviews() {
      try {
        if (idUser) {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}reviews/${idUser}`
          );
          setReviews(response.data.data);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    }

    if (idUser) {
      setCheckReviewNotifications();
      getReviews();
    }
  }, [userSession, navigate, idUser, REACT_APP_BACKEND_API]);
  return (
    <div className="my-reviews-container">
      <MenuProfile />
      <div className="my-reviews-div">
        <h1>Mis valoraciones</h1>
        {reviews &&
          reviews.map((review) => (
            <ReviewCard review={review} key={review.idReview} />
          ))}
        {error && <h2>{error}</h2>}
      </div>
    </div>
  );
}

export default MyReviews;
