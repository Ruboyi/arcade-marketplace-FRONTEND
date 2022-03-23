import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import theme from '../../theme/theme';
import axios from 'axios';

const { REACT_APP_BACKEND_API } = process.env;

export default function RecoveryPassword({ setOpenSucess }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [isError, setIsError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getRecoveryPassword(e) {
    e.preventDefault();
    if (!email) {
      setIsError(true);
      return;
    }
    await axios.post(`${REACT_APP_BACKEND_API}users/recovery-password`, {
      email
    });

    setOpenSucess(true);
    handleClose();
  }

  return (
    <div>
      <p className='links' onClick={handleClickOpen}>
        ¿Has olvidado tu contraseña? <strong>Recupérala aquí</strong>
      </p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Recuperar Contraseña</DialogTitle>
        <form onSubmit={getRecoveryPassword}>
          <DialogContent>
            <DialogContentText>
              Ingresa tu email, y te enviaremos a tu correo los pasos a seguir para
              restablecer tu contraseña.
            </DialogContentText>
            <TextField
              color='secondary'
              autoFocus
              margin='dense'
              id='name'
              label='Correo electrónico'
              type='email'
              error={isError}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              variant='standard'
              theme={theme}
            />
          </DialogContent>
          <DialogActions>
            <Button theme={theme} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type='submit'
              theme={theme}
              variant='contained'
              onClick={handleClose}>
              Recuperar Contraseña
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
