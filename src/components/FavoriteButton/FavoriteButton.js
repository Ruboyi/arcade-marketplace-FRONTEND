import axios from "axios";
<<<<<<< HEAD
=======
import { useAuthorization } from "../../hooks/useAuthorization";
>>>>>>> favButton-aaron

function FavoriteButton({ idProduct }) {
  const { userSession } = useAuthorization();

  const config = {
    headers: {
      Authorization: `Bearer ${userSession}`,
    },
  };
  return (
    <button
      onClick={() =>
        axios.post(`http://localhost:3000/api/v1/products/${idProduct}`, config)
      }
    >
      FAV
    </button>
  );
}
export default FavoriteButton;
