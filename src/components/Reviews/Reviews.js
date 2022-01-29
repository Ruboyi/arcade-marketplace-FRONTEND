import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function ReviewsUser() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(2);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addReviews = async () => {};

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Valora al comprador
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¡Valora al comprador!</DialogTitle>
        <DialogContent>
          <form>
            <Rating
              size="large"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <TextField
              multiline
              rows={4}
              autoFocus
              margin="dense"
              id="Valoración"
              label="Valoración"
              type="text"
              fullWidth
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
