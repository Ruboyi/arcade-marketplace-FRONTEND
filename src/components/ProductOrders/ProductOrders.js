import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization';
import './ProductOrders.css';

const { REACT_APP_BACKEND_API } = process.env;

export default function ProductOrders({ idProduct }) {
  const [productOrders, setProductOrders] = useState();
  const { userSession } = useAuthorization();

  useEffect(() => {
    async function getProductOrders() {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`
        }
      };
      const response = await axios.get(
        `${REACT_APP_BACKEND_API}orders/product/${idProduct}`,
        config
      );
      let orders = response.data.data;
      setProductOrders(orders);
    }
    getProductOrders();
  }, [userSession, idProduct]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <div>
      {productOrders ? (
        productOrders.map((order) => {
          return (
            <div key={order.idOrder} className='product-order-info-container'>
              <div className='product-order-status'>{order.status}</div>
              <div>
                Fecha de solicitud:{' '}
                <div className='product-order-date'>
                  {new Date(order.orderDate).toLocaleString('es-ES', options)}
                </div>
              </div>

              <div className='product-order-message-container'>
                Mensaje: <span>{order.orderSubject}</span>
                <div className='product-order-message'>{order.orderMessage}</div>
              </div>
              {order.status === 'solicitado' && (
                <button className='product-order-button-answer'>Responder</button>
              )}
              {order.status === 'reservado' && (
                <div>
                  <div className='product-order-answer-container'>
                    Respuesta:
                    <span className='product-order-answer-date'>
                      {new Date(order.reservationDate).toLocaleString(
                        'es-ES',
                        options
                      )}
                    </span>
                    <div>{order.saleMessage}</div>
                  </div>
                  <div className='product-order-sale-info'>
                    <div>
                      Ubicacion:
                      <span className='product-order-answer-date'>
                        {order.saleLocation}
                      </span>
                    </div>
                    <div>
                      Dia y hora de encuentro:
                      <div>
                        {new Date(order.reservationDate).toLocaleString(
                          'es-ES',
                          options
                        )}
                        {/* TODO PONERLE LA HORA */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
