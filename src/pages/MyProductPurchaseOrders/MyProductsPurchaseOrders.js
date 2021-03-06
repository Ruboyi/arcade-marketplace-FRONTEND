import { CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoBack from '../../components/GoBack/GoBack';
import ProductOrders from '../../components/ProductOrders/ProductOrders';
import { useAuthorization } from '../../hooks/useAuthorization';
import './MyProductsPurchaseOrders.css';

const { REACT_APP_BACKEND_API } = process.env;

function MyProductsPurchaseOrders() {
  const { userSession, userProfile } = useAuthorization();
  const navigate = useNavigate();
  const [myProducts, setMyProducts] = useState();
  const [isMyProductsEmpty, setIsMyProductsEmpty] = useState(false);
  const { idUser } = userProfile;

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }

    async function setCheckOrderNotifications() {
      const data = {}
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        }
      }
      await axios.put(`${REACT_APP_BACKEND_API}orders/sellerUser/${idUser}`, data, config)
    }

    async function getMyProducts() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`
        }
      };
      const response = await axios.get(
        `${REACT_APP_BACKEND_API}products/user/${idUser}`,
        config
      );
      if (response.data.data.length === 0) {
        setIsMyProductsEmpty(true);
      }
      setMyProducts(response.data.data);
    }

    if (idUser) {
      setCheckOrderNotifications()
      getMyProducts();
    }
  }, [userSession, navigate, idUser]);

  return (
    <main className='my-products-purchase-orders-div'>
      <h1>Solicitudes de compra</h1>
      <GoBack />

      {isMyProductsEmpty ? (
        <div>Aún no tienes Productos a la venta!</div>
      ) : myProducts ? (
        myProducts.map((product) => {
          return (
            <Paper className='my-product-orders-paper' key={product.idProduct}>

              <ProductOrders idProduct={product.idProduct} />
            </Paper>
          );
        })
      ) : (
        <CircularProgress />
      )
      }
    </main >
  );
}

export default MyProductsPurchaseOrders;
