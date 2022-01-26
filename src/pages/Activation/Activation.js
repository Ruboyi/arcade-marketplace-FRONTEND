import "./Activation.css";
import logo from "../../assets/logosinfondo.png";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Activation() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, [navigate]);
  return (
    <div>
      <img className="img-activationPage" src={logo} alt="logo" />
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Enhorabuena ya eres miembro de Arcade-MarketPlace
          <strong> Cuenta confirmada correctamente !!</strong>
        </Alert>
      </Stack>
    </div>
  );
}

export default Activation;
