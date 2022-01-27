import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SellerContact() {
  const [open, setOpen] = React.useState(false);

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
          <DialogContentText>
            Rellena este pequeño formuario y te pondremos en contacto con el
            dueño del producto.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Asunto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Metodo de contacto"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            multiline
            rows={4}
            variant="outlined"
            margin="dense"
            id="name"
            label="Mensaje"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
