import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";
import "./ProductOrders.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import { DateTimePicker } from "@mui/lab";
import ReviewsUser from "../Reviews/Reviews";
import theme from "../../theme/theme";

const { REACT_APP_BACKEND_API } = process.env;

export default function ProductOrders({ idProduct }) {
  const [productOrders, setProductOrders] = useState();
  const [productoSolicitado, setProductoSolicitado] = useState();
  const [users, setUsers] = useState();
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
            Authorization: `Bearer ${userSession}`,
          },
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
          `${REACT_APP_BACKEND_API}products/${idProduct}`
        );
        setProductoSolicitado(responseProductoSolicitado.data.data);

        async function getAllUser() {
          const response = await axios.get(
            `${REACT_APP_BACKEND_API}users/public`
          );
          setUsers(response.data.data);
        }
        getAllUser();
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
    getProductOrders();
  }, [userSession, idProduct]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const options2 = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const options3 = {
    hour: "2-digit",
    minute: "2-digit",
  };
  async function setSold(idUserBuyer, idOrder) {
    const data = {};
    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`,
      },
    };
    await axios.put(
      `${REACT_APP_BACKEND_API}orders/setSold/${idUserBuyer}/${idOrder}`,
      data,
      config
    );
    window.location.reload();
  }

  return (
    <div>
      {productoSolicitado && (
        <div>
          <img
            src={productoSolicitado.imagesURL[0]}
            alt="foto-product"
            height="100px"
          />
          <div className="order-product-title">{productoSolicitado.title}</div>
          <div className="order-product-info">
            <div>Precio: {productoSolicitado.price}</div>
            <div>Ubicacion: {productoSolicitado.location}</div>
          </div>
        </div>
      )}
      {productOrders &&
        productoSolicitado &&
        users &&
        productOrders.map((order) => {
          let userBuyer = users.find(
            (user) => user.idUser === order.idUserBuyer
          );

          return (
            <div key={order.idOrder} className="product-order-info-container">
              <div className="order-status">¡{order.status}!</div>
              <div className="order-info">
                <div className="order-user">
                  <img src={userBuyer.image} height="40px" alt="foto-user" />
                  <h2>{userBuyer.nameUser}</h2>
                </div>
                <div className="order-fecha">
                  <span>
                    {new Date(order.orderDate).toLocaleString("es-ES", options)}
                  </span>
                </div>
                <Divider sx={{ marginBottom: "15px" }} />
                <div className="order-mensaje-vendedor">
                  {order.orderMessage}
                </div>
                {/* TODO revisar porque si o si deberia tener saleDate si tiene saleMessage  */}
                {order.saleDate && (
                  <div className="order-mensaje-enviado">
                    Nos vemos el{" "}
                    {new Date(order.saleDate).toLocaleString("es-ES", options2)}{" "}
                    en {order.saleLocation} a las{" "}
                    {new Date(order.saleDate).toLocaleString("es-ES", options3)}{" "}
                    horas
                  </div>
                )}
                {order.saleMessage && (
                  <div className="order-mensaje-enviado">
                    {order.saleMessage}
                  </div>
                )}
              </div>
              {order.status === "solicitado" && (
                <div className="button-div">
                  <Button
                    theme={theme}
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    Aceptar solicitud
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    sx={{ height: "600px", marginTop: "80px" }}
                  >
                    <DialogTitle>Confirmar reserva</DialogTitle>
                    <DialogContent>
                      <Formik
                        initialValues={{
                          saleLocation: "",
                          saleMessage: "",
                          saleTypeOfContact: "email",
                        }}
                        validate={(values) => {
                          const errors = {};

                          if (!values.saleLocation) {
                            errors.saleLocation = "Localización requerida";
                          }
                          if (!values.saleMessage) {
                            errors.saleMessage = "Mensaje requerido";
                          }
                          if (!values.saleTypeOfContact) {
                            errors.saleTypeOfContact =
                              "Tipo de contacto requerido";
                          }
                          return errors;
                        }}
                        onSubmit={async (values) => {
                          console.log("SUBMIT: ", saleDate, values);
                          const {
                            saleLocation,
                            saleMessage,
                            saleTypeOfContact,
                          } = values;

                          const mySQLDateString = saleDate.format();

                          try {
                            const config = {
                              headers: {
                                Authorization: `Bearer ${userSession}`,
                              },
                            };

                            await axios.put(
                              `${REACT_APP_BACKEND_API}orders/${idProduct}/${order.idUserBuyer}`,
                              {
                                saleDate: mySQLDateString,
                                saleLocation,
                                saleMessage,
                                saleTypeOfContact,
                              },
                              config
                            );

                            window.location.reload();
                          } catch (error) {
                            // setError(error.response.data.error);
                            console.log(error.response.data.error);
                          }
                        }}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleSubmit,
                        }) => (
                          <form onSubmit={handleSubmit}>
                            <DialogContentText>
                              Rellena este formulario para responderle al
                              interesado. Al confirmar se rechazaran todas las
                              solicitudes de compra restantes para este
                              producto.
                            </DialogContentText>
                            {/* TODO TITULO DEL PRODUCTO  */}
                            <h3>Día y hora</h3>
                            <div>
                              <DateTimePicker
                                renderInput={(props) => (
                                  <TextField
                                    theme={theme}
                                    color="secondary"
                                    {...props}
                                  />
                                )}
                                label="Fecha de venta"
                                color="secondary"
                                onChange={(newDate) => {
                                  setSaleDate(newDate);
                                }}
                              />
                            </div>
                            <h3>Ubicación</h3>

                            <div>
                              <TextField
                                margin="dense"
                                id="saleLocation"
                                placeholder="Parque Europa, A Coruña"
                                variant="outlined"
                                onChange={handleChange}
                                theme={theme}
                                color="secondary"
                                value={values.saleLocation}
                                error={
                                  errors.saleLocation && touched.saleLocation
                                }
                                helperText={
                                  touched.saleLocation && errors.saleLocation
                                }
                                fullWidth
                              />
                            </div>

                            <h3>Mensaje</h3>
                            <div>
                              <TextField
                                margin="dense"
                                id="saleMessage"
                                placeholder="Lleva el dinero justo que no tengo cambio"
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={handleChange}
                                theme={theme}
                                color="secondary"
                                value={values.saleMessage}
                                error={
                                  errors.saleMessage && touched.saleMessage
                                }
                                helperText={
                                  touched.saleMessage && errors.saleMessage
                                }
                                fullWidth
                              />
                            </div>

                            <h3>Método de contacto</h3>
                            <FormControl>
                              <RadioGroup
                                theme={theme}
                                color="secondary"
                                aria-labelledby="saleTypeOfContact"
                                defaultValue="email"
                                name="saleTypeOfContact"
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="email"
                                  control={<Radio />}
                                  label="email"
                                />
                                <FormControlLabel
                                  value="phone"
                                  control={<Radio />}
                                  label="phone"
                                />
                              </RadioGroup>
                            </FormControl>

                            <DialogActions>
                              <Button theme={theme} onClick={handleClose}>
                                Cancelar
                              </Button>
                              <Button
                                theme={theme}
                                variant="contained"
                                type="submit"
                                onClick={handleClose}
                              >
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
              {order.status === "reservado" && (
                <div className="button-div">
                  <Button
                    variant="outlined"
                    theme={theme}
                    onClick={() => setSold(order.idUserBuyer, order.idOrder)}
                  >
                    Vendido
                  </Button>
                </div>
              )}
              {order.status === "vendido" && order.isBuyerReviewed === 0 ? (
                <ReviewsUser
                  idUser={order.idUserBuyer}
                  isBuyerOrSeller={"seller"}
                />
              ) : null}
            </div>
          );
        })}
    </div>
  );
}
