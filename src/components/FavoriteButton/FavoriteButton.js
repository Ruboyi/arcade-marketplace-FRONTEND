import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

function FavoriteButton({ idProduct }) {
  const { userSession } = useAuthorization();

  async function addFavorites() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const data = {};
      const response = await axios.post(
        `http://localhost:3000/api/v1/products/${idProduct}`,
        data,
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return <button onClick={() => addFavorites()}>FAV</button>;
}
export default FavoriteButton;
