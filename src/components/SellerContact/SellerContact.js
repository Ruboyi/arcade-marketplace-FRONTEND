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
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import theme from "../../theme/theme";

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
      <Button theme={theme} variant="outlined" onClick={handleClickOpen}>
        Contacta
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contacta con el vendedor</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              orderSubject: "",
              orderTypeOfContact: "email",
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
                handleClose();
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
                  color="secondary"
                  theme={theme}
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
                <FormControl>
                  <RadioGroup
                    color="secondary"
                    theme={theme}
                    aria-labelledby="orderTypeOfContact"
                    defaultValue="email"
                    name="orderTypeOfContact"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      color="secondary"
                      theme={theme}
                      value="email"
                      control={<Radio />}
                      label="Email"
                    />
                    <FormControlLabel
                      color="secondary"
                      theme={theme}
                      value="phone"
                      control={<Radio />}
                      label="Teléfono"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  color="secondary"
                  theme={theme}
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
                  <Button theme={theme} onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button theme={theme} variant="contained" type="submit">
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
