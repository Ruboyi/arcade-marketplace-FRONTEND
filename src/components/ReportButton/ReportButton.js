import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReportIcon from "@mui/icons-material/Report";
import { Formik } from "formik";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";
import { IconButton, MenuItem, Select } from "@mui/material";
import theme from "../../theme/theme";

const { REACT_APP_BACKEND_API } = process.env;

export default function ReportButton({ idProduct, setError, setIsReported }) {
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
      <IconButton onClick={handleClickOpen}>
        <ReportIcon fontSize="small" sx={{ color: "grey" }} />
        <p className="reportP">Reportar</p>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reportar producto</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              reason: "",
              description: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.reason) {
                errors.reason = "Motivo requerido";
              }
              if (!values.description) {
                errors.description = "Descripción requerida";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              const { reason, description } = values;
              try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userSession}`,
                  },
                };
                await axios.post(
                  `${REACT_APP_BACKEND_API}reports/${idProduct}`,
                  { reason, description },
                  config
                );
                setIsReported(true);
                handleClose();
              } catch (error) {
                setError(error.response.data.error);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DialogContentText>
                  ¿Cual es el motivo de reportar este producto?
                </DialogContentText>
                <Select
                  value={values.reason}
                  labelId="reason"
                  id="reason"
                  name="reason"
                  label="reason"
                  onChange={handleChange}
                  sx={{ margin: 1, width: "100%" }}
                  theme={theme}
                  state
                >
                  <MenuItem value="" disabled>
                    Selecciona el motivo de su denuncia
                  </MenuItem>
                  <MenuItem value={"fraude"}>Fraude</MenuItem>
                  <MenuItem value={"no asistencia a la cita"}>
                    No asistencia a la cita
                  </MenuItem>
                  <MenuItem value={"mal comportamiento o abuso"}>
                    Mal comportamiento o abuso
                  </MenuItem>
                  <MenuItem value={"articulo defectuoso o incorrecto"}>
                    Articulo defectuoso o incorrecto
                  </MenuItem>
                  <MenuItem value={"otras causas"}>Otras causas</MenuItem>
                </Select>
                <DialogContentText>
                  Explique brevemente el motivo de su denuncia
                </DialogContentText>
                <TextField
                  autoFocus
                  multiline
                  onChange={handleChange}
                  rows={4}
                  variant="outlined"
                  margin="dense"
                  id="description"
                  name="description"
                  value={values.description}
                  error={errors.description && touched.description}
                  helperText={touched.description && errors.description}
                  label="Descripción"
                  type="text"
                  theme={theme}
                  fullWidth
                />
                <DialogActions>
                  <Button onClick={handleClose} theme={theme}>
                    Cancelar
                  </Button>
                  <Button type="submit" theme={theme}>
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
