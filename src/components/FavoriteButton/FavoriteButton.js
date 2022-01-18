import axios from "axios";
import { AuthProvider } from "../../hooks/useAuthorization";

const [userSession] = AuthProvider();

function FavoriteButton({ idProduct }) {
  return (
    <button
      onClick={async function addToFavorite() {
        try {
          await axios.post(
            `http://localhost:3000/api/v1/products/${idProduct}`
          );
        } catch (error) {
          window.alert("No se ha podido añadir a favoritos!");
        }
      }}
    >
      FAV
    </button>
  );
}
export default FavoriteButton;
