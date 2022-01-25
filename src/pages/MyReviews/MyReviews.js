import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";

// const reviews = [
//   {
//     opinion: "Buen comprador",
//     rating: 2,
//     isSeller: 0,
//     idReview: 0,
//   },
//   {
//     opinion: "Buen comprador",
//     rating: 2,
//     isSeller: 0,
//     idReview: 1,
//   },
//   {
//     opinion: "Buen comprador",
//     rating: 2,
//     isSeller: 0,
//     idReview: 2,
//   },
// ];

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
      <h1>Mis valoraciones</h1>
      {reviews &&
        reviews.map((review) => {
          return (
            <div key={review.idReview}>
              <h2> Rating: {review.rating}</h2>
              <h2> Opinión: {review.opinion}</h2>
              <h2> {review.isSeller === 1 ? "Es vendedor" : "Es comprador"}</h2>
            </div>
          );
        })}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default MyReviews;
