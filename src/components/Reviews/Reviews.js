import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { useState } from "react";
import "./Reviews.css";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";

const { REACT_APP_BACKEND_API } = process.env;

export default function ReviewsUser({ idUser, isBuyerOrSeller, idUserBuyer }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(2);
  const [opinion, setOpinion] = useState("");
  const { userSession } = useAuthorization();
  const [isSeller] = useState(1);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const addReviews = async (e) => {
    e.preventDefault();
    console.log("Submit!!", rating, opinion, isSeller);
    const data = {}
    const body = {
      rating,
      opinion,
      isSeller,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${userSession}`,
      },
    };

    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_API}reviews/${idUser}`,
        body,
        config
      );
      if (isBuyerOrSeller === 'buyer') {
        await axios.put(
          `${REACT_APP_BACKEND_API}orders/setSeller/${idUser}`, data, config
        )
      } else if (isBuyerOrSeller === 'seller') {
        await axios.put(
          `${REACT_APP_BACKEND_API}orders/setBuyer/${idUser}`, data, config
        )
      }

      console.log(response.data);

      handleClose();
      window.location.reload(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: 1 }}>
        Dar valoración
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ textAlign: "center" }}>
        <DialogTitle>¡Valora al vendedor!</DialogTitle>
        <DialogContent>
          <form onSubmit={addReviews}>
            <Rating
              sx={{ fontSize: "3.875rem", textAlign: "center" }}
              size="large"
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              multiline
              rows={4}
              autoFocus
              margin="dense"
              id="Valoración"
              label="Valoración"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              type="text"
              fullWidth
              variant="outlined"
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit">Enviar</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
