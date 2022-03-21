import { CircularProgress, Divider, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuProfile from '../../components/MenuProfile/MenuProfile';
import { useAuthorization } from '../../hooks/useAuthorization';
import './MyOrders.css';
import ReviewsUser from '../../components/Reviews/Reviews';

const { REACT_APP_BACKEND_API } = process.env;

function MyOrders() {
  const { userSession, userProfile } = useAuthorization();
  const [products, setProducts] = useState();
  const [myOrders, setMyOrders] = useState();
  const navigate = useNavigate();
  const { idUser } = userProfile;

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }

    async function getMyOrders() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`
        }
      };
      if (idUser) {
        const response = await axios.get(
          `${REACT_APP_BACKEND_API}orders/user/${idUser}`,
          config
        );
        setMyOrders(response.data.data);
      }
    }
    getMyOrders();

    async function getProducts() {
      const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
      setProducts(response.data.data);
    }
    getProducts();
  }, [userSession, navigate, idUser]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const options2 = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  const options3 = {
    hour: '2-digit',
    minute: '2-digit'
  };

  console.log(myOrders);
  // console.log(products);
  return (
    <div className='my-orders-container'>
      <MenuProfile />
      <div className='my-orders-div'>
        <h1>Mis reservas</h1>
        {myOrders && idUser && products ? (
          myOrders.map((order) => {
            let productoSolicitado = products.find(
              (product) => product.idProduct === order.idProduct
            );

            return (
              <Paper key={order.idOrder} className='paper-myOrders-container'>
                <div className='order-container'>
                  <div className='order-status'>¡{order.status}!</div>
                  {/* TODO HACER LLAMADA A LAS IMAGENES PARA AÑADIRLA ACA */}
                  <div className='order-product-title'>
                    {productoSolicitado.title}
                  </div>
                  <div className='order-product-info'>
                    <div>Precio: {productoSolicitado.price}</div>
                    <div>Ubicacion: {productoSolicitado.location}</div>
                  </div>
                  <div className='order-info'>
                    <div className='order-fecha'>
                      <span>
                        {new Date(order.orderDate).toLocaleString('es-ES', options)}
                      </span>
                    </div>
                    <Divider sx={{ marginBottom: '15px' }} />
                    <div className='order-mensaje-enviado'>{order.orderMessage}</div>
                    {/* TODO revisar porque si o si deberia tener saleDate si tiene saleMessage  */}
                    {order.saleDate && (
                      <div className='order-mensaje-vendedor'>
                        Nos vemos el{' '}
                        {new Date(order.saleDate).toLocaleString('es-ES', options2)}{' '}
                        en {order.saleLocation} a las{' '}
                        {new Date(order.saleDate).toLocaleString('es-ES', options3)}{' '}
                        horas
                      </div>
                    )}
                    {order.saleMessage && (
                      <div className='order-mensaje-vendedor'>
                        {order.saleMessage}
                      </div>
                    )}
                  </div>
                  {order.status === 'vendido' && order.isSellerReviewed === 0 ? (
                    <ReviewsUser
                      idUser={productoSolicitado.idUser}
                      isBuyerOrSeller={'buyer'}
                    />
                  ) : null}
                  {/* TODO FALTA BOTON PARA CANCELAR RESERVA ETC */}
                </div>
              </Paper>
            );
          })
        ) : (
          <CircularProgress />
        )}
      </div>
    </div >
  );
}

export default MyOrders;
