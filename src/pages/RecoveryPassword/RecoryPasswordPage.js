import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import theme from "../../theme/theme";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import SnackbarError from "../../components/SnackbarError/SnackbarError";
import SnackbarSuccess from "../../components/SnackbarSuccess/SnackbarSuccess";

const { REACT_APP_BACKEND_API } = process.env;

export default function RecoveryPasswordPage() {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [backendReponse, setBackendResponse] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [openSucess, setOpenSucess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const { code } = useParams();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  async function getChangePassword(e) {
    e.preventDefault();
    try {
      if (password !== repeatPassword) {
        setIsError(true);
        setOpenError(true);
        setError("Las contraseña no coinciden");
        return;
      }
      const response = await axios.put(
        `${REACT_APP_BACKEND_API}users/password/${code}`,
        { password }
      );
      setBackendResponse(response.data.message);
      console.log(response.data.message);
      setOpenSucess(true);
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      console.log(error);
      setOpenError(true);
      setIsError(true);
      setError(error.response.data.error);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recuperar Contraseña</DialogTitle>
        <form onSubmit={getChangePassword}>
          <DialogContent>
            <DialogContentText>
              Escribe la nueva contraseña que quieres usar.
            </DialogContentText>
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              id="password"
              label="Contraseña"
              type="password"
              error={isError}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
              theme={theme}
            />
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              id="repeatPassword"
              label="Repita la contraseña"
              type="password"
              error={isError}
              fullWidth
              onChange={(e) => setRepeatPassword(e.target.value)}
              variant="standard"
              theme={theme}
            />
          </DialogContent>
          <DialogActions>
            <Button theme={theme} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              theme={theme}
              variant="contained"
              onClick={handleClose}
            >
              Cambiar Contraseña
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {error && (
        <SnackbarError
          error={error}
          openError={openError}
          setOpenError={setOpenError}
        />
      )}
      {backendReponse && (
        <SnackbarSuccess
          message={backendReponse}
          open={openSucess}
          setOpen={setOpenSucess}
        />
      )}
    </div>
  );
}
