import logo from "../../assets/logosinfondo.png";
import Welcome from "../../components/Welcome/Welcome";
import "./home.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewsUser from "../../components/Reviews/Reviews";

function Home() {
  const { userSession } = useAuthorization();
  const navigate = useNavigate();

  useEffect(() => {
    if (userSession) {
      navigate("/products");
    }
  }, [userSession, navigate]);
  return (
    <div>
      <header className="home-header">
        <img className="img-home" src={logo} alt="logo" />
      </header>
      <Welcome />
      <ReviewsUser />
    </div>
  );
}

export default Home;
