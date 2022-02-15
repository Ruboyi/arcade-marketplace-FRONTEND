import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthorization } from '../../hooks/useAuthorization';
import './ProductOrders.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { DateTimePicker } from '@mui/lab';
import ReviewsUser from '../Reviews/Reviews';

const { REACT_APP_BACKEND_API } = process.env;

export default function ProductOrders({ idProduct }) {
  const [productOrders, setProductOrders] = useState();
  const [productoSolicitado, setProductoSolicitado] = useState()
  const { userSession } = useAuthorization();
  const [saleDate, setSaleDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getProductOrders() {
      try {
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
        if (orders.length === 0) {
          setProductOrders(false);
        } else {
          setProductOrders(orders);
        }
        const responseProductoSolicitado = await axios.get(
          `${REACT_APP_BACKEND_API}products/${idProduct}`)
        setProductoSolicitado(responseProductoSolicitado.data.data)
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    getProductOrders();
  }, [userSession, idProduct]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  async function setSold(idUserBuyer, idOrder) {
    const data = {}
    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`
      }
    }
    await axios.put(`${REACT_APP_BACKEND_API}orders/setSold/${idUserBuyer}/${idOrder}`, data,
      config)
    window.location.reload();
  }

  return (
    <div>
      {productOrders && productoSolicitado ? (
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
                <div>
                  <Button variant='outlined' onClick={handleClickOpen}>
                    Aceptar solicitud
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirmar reserva</DialogTitle>
                    <DialogContent>
                      <Formik
                        initialValues={{
                          saleLocation: '',
                          saleMessage: '',
                          saleTypeOfContact: 'email'
                        }}
                        validate={(values) => {
                          const errors = {};

                          if (!values.saleLocation) {
                            errors.saleLocation = 'Localización requerida';
                          }
                          if (!values.saleMessage) {
                            errors.saleMessage = 'Mensaje requerido';
                          }
                          if (!values.saleTypeOfContact) {
                            errors.saleTypeOfContact = 'Tipo de contacto requerido';
                          }
                          return errors;
                        }}
                        onSubmit={async (values) => {
                          console.log('SUBMIT: ', saleDate, values);
                          const { saleLocation, saleMessage, saleTypeOfContact } =
                            values;

                          const mySQLDateString = saleDate.format();

                          try {
                            const config = {
                              headers: {
                                Authorization: `Bearer ${userSession}`
                              }
                            };

                            await axios.put(
                              `${REACT_APP_BACKEND_API}orders/${idProduct}/${order.idUserBuyer}`,
                              {
                                saleDate: mySQLDateString,
                                saleLocation,
                                saleMessage,
                                saleTypeOfContact
                              },
                              config
                            );

                            window.location.reload();
                          } catch (error) {
                            // setError(error.response.data.error);
                            console.log(error.response.data.error);
                          }
                        }}>
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <DialogContentText>
                              Rellena este formulario para responderle al interesado.
                              Al confirmar se rechazaran todas las solicitudes de
                              compra restantes para este producto.
                            </DialogContentText>
                            {/* TODO TITULO DEL PRODUCTO  */}
                            <h3>Día y hora</h3>
                            <div>
                              <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label='Fecha de venta'
                                value={saleDate}
                                onChange={(newDate) => {
                                  setSaleDate(newDate);
                                }}
                              />
                            </div>
                            <h3>Ubicación</h3>

                            <div>
                              <TextField
                                margin='dense'
                                id='saleLocation'
                                placeholder='Parque Europa, A Coruña'
                                variant='outlined'
                                onChange={handleChange}
                                value={values.saleLocation}
                                error={errors.saleLocation && touched.saleLocation}
                                helperText={
                                  touched.saleLocation && errors.saleLocation
                                }
                                fullWidth
                              />
                            </div>

                            <h3>Mensaje</h3>
                            <div>
                              <TextField
                                margin='dense'
                                id='saleMessage'
                                placeholder='Lleva el dinero justo que no tengo cambio'
                                multiline
                                rows={4}
                                variant='outlined'
                                onChange={handleChange}
                                value={values.saleMessage}
                                error={errors.saleMessage && touched.saleMessage}
                                helperText={
                                  touched.saleMessage && errors.saleMessage
                                }
                                fullWidth
                              />
                            </div>

                            <h3>Método de contacto</h3>
                            <FormControl>
                              <RadioGroup
                                aria-labelledby='saleTypeOfContact'
                                defaultValue='email'
                                name='saleTypeOfContact'
                                onChange={handleChange}>
                                <FormControlLabel
                                  value='email'
                                  control={<Radio />}
                                  label='email'
                                />
                                <FormControlLabel
                                  value='phone'
                                  control={<Radio />}
                                  label='phone'
                                />
                              </RadioGroup>
                            </FormControl>

                            <DialogActions>
                              <Button onClick={handleClose}>Cancelar</Button>
                              <Button type='submit' onClick={handleClose}>
                                Confirmar
                              </Button>
                            </DialogActions>
                          </form>
                        )}
                      </Formik>
                    </DialogContent>
                  </Dialog>
                </div>
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
                  <button onClick={() => setSold(order.idUserBuyer, order.idOrder)}>Vendido</button>
                </div>
              )}
              {order.status === 'vendido' && order.isBuyerReviewed === 0 ? (<ReviewsUser idUser={order.idUserBuyer} isBuyerOrSeller={'seller'} />) : null}
            </div>
          );
        })
      ) : (
        <div>No tienes ordenes de compra para este producto</div>
      )}
    </div>
  );
}
