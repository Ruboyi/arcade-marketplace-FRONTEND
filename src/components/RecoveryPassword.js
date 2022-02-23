import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import theme from "../theme/theme";

export default function RecoveryPassword() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <p className="links" onClick={handleClickOpen}>
        ¿Has olvidado tu contraseña? <strong>Recuperala aquí</strong>
      </p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recuperar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa tu email, y te enviaremos a tu correo los pasos a seguir
            para restablecer tu contraseña.
          </DialogContentText>
          <TextField
            color="secondary"
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            theme={theme}
          />
        </DialogContent>
        <DialogActions>
          <Button theme={theme} onClick={handleClose}>
            Cancelar
          </Button>
          <Button theme={theme} variant="contained" onClick={handleClose}>
            Recuperar Contraseña
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
