import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logosinfondo.png";
import "./home.css";

function Home() {
  return (
    <div>
      <header className="home-header">
        <img className="img-home" src={logo} alt="logo" />
      </header>
      <main>
        <h1>Bienvenidos a Arcade Marketplace</h1>
        <Paper className="home-container">
          <h2>
            Tu sitio perfecto para compra-venta de productos del mundo gaming
          </h2>
          <p>
            Aquí podrás encontrar todos tus productos favoritos para revivir
            buenas épocas y disfrutar de juegos que nunca se irán de nuestra
            memoria
          </p>
          <h3>CONSOLAS, VIDEOJUEGOS, ACCESORIO Y ARCADES.</h3>
          <p>o si tienes algo que ya no usas, véndelo al mejor precio!</p>
          <Link to={"/login"}>Pincha aquí si quieres iniciar tu aventura</Link>
        </Paper>
      </main>
    </div>
  );
}

export default Home;
