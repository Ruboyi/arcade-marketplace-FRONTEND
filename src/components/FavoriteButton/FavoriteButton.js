import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useEffect, useState } from "react";
import "./FavoriteButton.css";
import { Badge, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function FavoriteButton({ idProduct }) {
  const [nameClass, setNameClass] = useState();
  const [numberOfFavs, setNumberOfFavs] = useState();
  const { userSession } = useAuthorization();
  useEffect(() => {
    async function getFavorites() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userSession}`,
          },
        };

        const favorites = await axios.get(
          `http://localhost:3000/api/v1/users/favorites`,
          config
        );

        const favMap = favorites.data.data.map((object) => object.idProduct);
        if (favMap.some((e) => e === Number(idProduct))) {
          setNameClass("deleteButton");
        } else {
          setNameClass("addButton");
        }

        const responseNumberOfFavs = await axios.get(
          `http://localhost:3000/api/v1/products/favorites/${idProduct}`
        );
        setNumberOfFavs(responseNumberOfFavs.data[0].numberOfFavs);
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites();
  }, [idProduct, userSession, numberOfFavs]);

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

      const favMap = favorites.data.data.map((object) => object.idProduct);

      if (favMap.some((e) => e === Number(idProduct))) {
        setNameClass("addButton");
        //Delete from favorites
        await axios.delete(
          `http://localhost:3000/api/v1/products/favorites/${idProduct}`,
          config
        );
      } else {
        setNameClass("deleteButton");
        //Add to favorites
        await axios.post(
          `http://localhost:3000/api/v1/products/${idProduct}`,
          data,
          config
        );
      }
      const responseNumberOfFavs = await axios.get(
        `http://localhost:3000/api/v1/products/favorites/${idProduct}`
      );
      setNumberOfFavs(responseNumberOfFavs.data[0].numberOfFavs);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="FavoriteComponent">
      <IconButton
        aria-label="add to favorites"
        onClick={() => addOrDeleteFavorites()}
      >
        <Badge badgeContent={numberOfFavs}>
          <FavoriteIcon sx={{ color: "red" }} fontSize="large" />
        </Badge>
      </IconButton>
    </div>
  );
}

export default FavoriteButton;
