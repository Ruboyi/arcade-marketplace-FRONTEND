import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthorization } from "./useAuthorization";

const { REACT_APP_BACKEND_API } = process.env;

function useNotification() {
  const { userSession, userProfile } = useAuthorization();
  const { idUser } = userProfile;
  const [numbReviews, setNumbReviews] = useState();
  const [numbPurcharseOrders, setNumberPurcharseOrders] = useState();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`,
      },
    };
    async function getReviews() {
      try {
        if (idUser) {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}reviews/${idUser}`
          );

          setNumbReviews(response.data.data.length);
        }
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    async function getPurchaseOrders() {
      try {
        if (idUser) {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}orders/sellerUser/${idUser}`,
            config
          );
          setNumberPurcharseOrders(response.data.data.length);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getReviews();
    getPurchaseOrders();
  }, [idUser, userSession]);

  return { numbReviews, numbPurcharseOrders };
}

export default useNotification;
