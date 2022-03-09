import { Paper, Rating } from "@mui/material";
import { useNavigate } from "react-router";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const navigate = useNavigate();
  const {
    idReview,
    image,
    rating,
    opinion,
    isSeller,
    nameUser,
    idUserReviewer,
  } = review;

  return (
    <Paper
      key={idReview}
      elevation={3}
      className="user-card"
      onClick={() => navigate(`/user/${nameUser}/${idUserReviewer}`)}
      sx={{ maxWidth: "76vw", margin: "0 auto" }}
    >
      <img className="profileImage" src={image} alt="img-avatar" />
      <div className="name-rating">
        <h1>{nameUser}</h1>
        <Rating name="read-only" value={rating} readOnly />
      </div>
      <h2>{opinion}</h2>
      <h2>{isSeller === 1 ? "vendedor" : "comprador"}</h2>
    </Paper>
  );
}

export default ReviewCard;
