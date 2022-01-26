import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  IconButton,
  Link,
  Paper,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthorization } from "../../hooks/useAuthorization";
import logo from "../../assets/logosinfondo.png";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import "./Settings.css";
import { Input, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import GoBack from "../../components/GoBack/GoBack";

const { REACT_APP_BACKEND_API } = process.env;

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function Settings() {
  const { userProfile, userSession, getUserProfile, logout } =
    useAuthorization();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [fichero, setFichero] = useState();
  const [open, setOpen] = useState(false);
  console.log(open);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(fichero);

  const Input = styled("input")({
    display: "none",
  });
  async function deleteAccount() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const { idUser } = userProfile;

      logout();

      const response = await axios.delete(
        `${REACT_APP_BACKEND_API}users/${idUser}`,
        config
      );

      handleClose();
    } catch (error) {
      setError(error.response);
    }
  }

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
  }, [userSession, navigate]);
  console.table(userProfile);
  return (
    <div>
      <GoBack />
      <header className="header-Editar">
        <img className="img-register" src={logo} alt="logo" />
        <h1>Edita tu perfi</h1>
      </header>
      {userProfile ? (
        <Paper className="register-container">
          <header className="header-settings">
            <img
              className="img-settings"
              src={userProfile.image}
              alt="foto-perfil"
            />
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => setFichero(e.target.files[0])}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <div>
              <h1>{userProfile.nameUser}</h1>
              <Rating name="read-only" value={4} readOnly />
            </div>
          </header>
          <Formik
            initialValues={{
              email: userProfile.email,
              password: "",
              repeatedPassword: "",
              nameUser: userProfile.nameUser,
              bio: userProfile.bio,
              phone: userProfile.phone,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "Email requerido!";
              }

              if (!values.nameUser) {
                errors.nameUser = "Nombre requerido!";
              } else {
                // TODO: mas comprobaciones
              }

              if (!values.password) {
                errors.password = "Contraseña requerida!";
              }

              if (!values.bio) {
                errors.bio =
                  "Porfavor introduce una pequeña información sobre ti";
              }

              if (!values.phone) {
                error.phone = "Introduce tu numero de teléfono";
              }

              if (!values.repeatedPassword) {
                errors.repeatedPassword = "Repite la contraseña!";
              } else {
                if (values.password !== values.repeatedPassword) {
                  errors.repeatedPassword = "Contraseñas deben coincidir!";
                }
              }

              return errors;
            }}
            onSubmit={async (values) => {
              console.log("SUBMIT: ", values);
              const { nameUser, password, email, bio, phone } = values;

              try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userSession}`,
                  },
                };
                const response = await axios.put(
                  "http://localhost:3000/api/v1/users",
                  {
                    nameUser,
                    password,
                    email,
                    bio,
                    phone,
                  },
                  config
                );

                console.log("usuario modificado!: ", response.data);

                const formData = new FormData();

                formData.append("profileImage", fichero);

                console.log("FORMADATA", formData);

                await axios.post(
                  `${REACT_APP_BACKEND_API}users/upload`,
                  formData,
                  config
                );
                getUserProfile();

                setTimeout(() => {
                  navigate("/profile");
                }, 1000);
              } catch (error) {
                setError(error);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="field-container">
                  <h3>
                    <AssignmentIndOutlinedIcon /> Información personal{" "}
                  </h3>
                  <TextField
                    id="nameUser"
                    name="nameUser"
                    label="Nombre"
                    variant="standard"
                    onChange={handleChange}
                    value={values.nameUser}
                    error={errors.nameUser && touched.nameUser}
                    helperText={touched.nameUser && errors.nameUser}
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    variant="standard"
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    id="phone"
                    name="phone"
                    label="Teléfono"
                    type="tel"
                    variant="standard"
                    onChange={handleChange}
                    value={values.phone}
                    error={errors.phone && touched.phone}
                    helperText={touched.phone && errors.phone}
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    id="bio"
                    name="bio"
                    label="Descripción personal"
                    variant="outlined"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    value={values.bio}
                    error={errors.bio && touched.bio}
                    helperText={touched.bio && errors.bio}
                    fullWidth
                  />
                </div>
                <h3>
                  <SecurityOutlinedIcon /> Seguridad
                </h3>
                <div className="field-container">
                  <TextField
                    id="password"
                    name="password"
                    type={"password"}
                    label="Contraseña"
                    variant="standard"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    id="repeated-password"
                    name="repeatedPassword"
                    type={"password"}
                    label="Repetir Contraseña"
                    variant="standard"
                    onChange={handleChange}
                    value={values.repeatedPassword}
                    error={errors.repeatedPassword && touched.repeatedPassword}
                    helperText={
                      touched.repeatedPassword && errors.repeatedPassword
                    }
                    fullWidth
                  />
                </div>
                <Link
                  component="button"
                  variant="body2"
                  type="button"
                  onClick={() => handleClickOpen()}
                >
                  Quiero darme de baja
                </Link>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperComponent={PaperComponent}
                  aria-labelledby="draggable-dialog-title"
                >
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    ¡OJO!
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      ¿Estas seguro de eliminar tu cuenta? Si comfirmas no hay
                      vuelta atrás.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button onClick={deleteAccount}>Comfirmar</Button>
                  </DialogActions>
                </Dialog>
                {error && (
                  <Stack sx={{ width: "100%", margin: 1 }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Stack>
                )}
                <div className="button-submit-container">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: "#090D41",
                    }}
                  >
                    Comfirmar
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Settings;
