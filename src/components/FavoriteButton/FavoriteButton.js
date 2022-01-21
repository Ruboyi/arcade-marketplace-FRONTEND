import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

import "./FavoriteButton.css";

function FavoriteButton({ idProduct }) {
  const { userSession } = useAuthorization();

  async function addOrDeleteFavorites() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const data = {};

      const favorites = await axios.get(
        `http://localhost:3000/api/v1/users/favorites`,
        config
      );

      if (typeof favorites.data.data === "string") {
        //Add to favorites
        await axios.post(
          `http://localhost:3000/api/v1/products/${idProduct}`,
          data,
          config
        );
      } else {
        const favMap = favorites.data.data.map((object) => object.idProduct);

        if (favMap.some((e) => e === Number(idProduct))) {
          //Delete from favorites
          await axios.delete(
            `http://localhost:3000/api/v1/products/favorites/${idProduct}`,
            config
          );
        } else {
          //Add to favorites
          await axios.post(
            `http://localhost:3000/api/v1/products/${idProduct}`,
            data,
            config
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button className="addButton" onClick={() => addOrDeleteFavorites()}>
      FAV
    </button>
  );
}

export default FavoriteButton;
