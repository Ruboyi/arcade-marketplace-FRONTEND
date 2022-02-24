import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import theme from "../../theme/theme";

export default function MailSucessModal({ openSucess, setOpenSucess }) {
  const handleClose = () => {
    setOpenSucess(false);
  };

  return (
    <div>
      <Dialog
        open={openSucess}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Correo enviado correctamente
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hemos enviado un correo a tu cuenta, revisa tu bandeja de entrada y
            sigue los pasos para recuperar tu contraseña
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button theme={theme} onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
