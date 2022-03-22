import logo from "../../assets/logosinfondo.png";
import { Button } from "@mui/material";
import "./home.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../theme/theme";

function Home() {
  const { userSession } = useAuthorization();
  const navigate = useNavigate();

  useEffect(() => {
    if (userSession) {
      navigate("/products");
    }
  }, [userSession, navigate]);
  return (
    <div className="home-arcade">
      <header className="home-header">
        <img className="img-home" src={logo} alt="logo" />
        <h1>Tu portal de compra-venta perfecto para revivir el gaming retro</h1>
      </header>
      <Button
        variant="contained"
        onClick={() => navigate("/landing")}
        theme={theme}
        sx={{ marginBottom: "40px" }}
      >
        Viajar en el tiempo
      </Button>
    </div>
  );
}

export default Home;
