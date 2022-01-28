import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

const { REACT_APP_BACKEND_API } = process.env;

export default function SellerContact({ idProduct, setError, setIsCreated }) {
  const [open, setOpen] = useState(false);
  const { userSession } = useAuthorization();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Contacta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contacta con el vendedor</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              orderSubject: "",
              orderTypeOfContact: "",
              orderMessage: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.orderSubject) {
                errors.orderSubject = "Asunto requerido";
              }
              if (!values.orderTypeOfContact) {
                errors.orderTypeOfContact = "Tipo de contacto requerido";
              }
              if (!values.orderMessage) {
                errors.orderMessage = "Escribe un mensaje para el comprador";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const { orderSubject, orderTypeOfContact, orderMessage } = values;
              try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userSession}`,
                  },
                };
                await axios.post(
                  `${REACT_APP_BACKEND_API}orders/${idProduct}`,
                  { orderSubject, orderTypeOfContact, orderMessage },
                  config
                );
                setIsCreated(true);
              } catch (error) {
                setError(error.response.data.error);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DialogContentText>
                  Rellena este pequeño formuario y te pondremos en contacto con
                  el dueño del producto.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="orderSubject"
                  name="orderSubject"
                  onChange={handleChange}
                  value={values.orderSubject}
                  label="Asunto"
                  type="text"
                  error={errors.orderSubject && touched.orderSubject}
                  helperText={touched.orderSubject && errors.orderSubject}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="orderTypeOfContact"
                  name="orderTypeOfContact"
                  onChange={handleChange}
                  value={values.orderTypeOfContact}
                  error={
                    errors.orderTypeOfContact && touched.orderTypeOfContact
                  }
                  helperText={
                    touched.orderTypeOfContact && errors.orderTypeOfContact
                  }
                  label="Metodo de contacto"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  multiline
                  onChange={handleChange}
                  rows={4}
                  variant="outlined"
                  margin="dense"
                  id="orderMessage"
                  name="orderMessage"
                  value={values.orderMessage}
                  error={errors.orderMessage && touched.orderMessage}
                  helperText={touched.orderMessage && errors.orderTypeOfContact}
                  label="Mensaje"
                  type="text"
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button type="submit" onClick={handleClose}>
                    Enviar
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
