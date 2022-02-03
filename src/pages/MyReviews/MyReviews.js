import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import GoBack from "../../components/GoBack/GoBack";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

function MyReviews() {
  const [reviews, setReviews] = useState();
  const [error, setError] = useState();
  const { userProfile } = useAuthorization();
  const { idUser } = userProfile;

  useEffect(() => {
    async function getReviews() {
      try {
        if (idUser) {
          const response = await axios.get(
            `http://localhost:3000/api/v1/reviews/${idUser}`
          ); // METER LA VARIABLE DEL .ENV
          console.log(response.data.data);

          setReviews(response.data.data);
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    }
    getReviews();
  }, [idUser]);
  return (
    <div>
      <GoBack />
      <h1>Mis valoraciones</h1>
      {reviews && reviews.map((review) => <ReviewCard review={review} />)}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default MyReviews;
