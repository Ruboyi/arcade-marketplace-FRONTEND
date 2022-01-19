import { CircularProgress, Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { userProfile, userSession } = useAuthorization();

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
  }, [userSession, navigate]);

  return (
    <div className="profile">
      <button className="goBack-button" onClick={() => navigate("/")}>
        Atras
      </button>
      {userProfile ? (
        <Paper className="profile-paper">
          <h1>{userProfile.nameUser}</h1>
          <h2>{userProfile.email}</h2>
          <h3>{userProfile.phone}</h3>
          {userProfile.image !== null ? (
            <img src={userProfile.image} alt="profile" height={150} />
          ) : (
            <span className="default-image-profile">IMAGEN DE PERFIL</span>
          )}
          <p>DESCRIPCION DESCRIPCION ESCRIPCION DESCRIPCION</p>
        </Paper>
      ) : (
        <CircularProgress />
      )}

      <div className="buttons-container-profile">
        <button onClick={() => navigate("/my-products")}>Mis productos</button>
        <button onClick={() => navigate("/my-orders")}>Mis reservas</button>
        <button onClick={() => navigate("/my-reviews")}>
          Mis valoraciones
        </button>
        <button onClick={() => navigate("/settings")}>Ajustes</button>
      </div>
    </div>
  );
}

export default Profile;
