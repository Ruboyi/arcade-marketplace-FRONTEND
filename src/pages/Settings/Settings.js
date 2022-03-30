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
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import "./Settings.css";
import { PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import MenuProfile from "../../components/MenuProfile/MenuProfile";
import theme from "../../theme/theme";
import defaultAvatar from "../../assets/defaultAvatar.png";

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
  const { userProfile, setUserProfile, userSession, logout } =
    useAuthorization();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [fichero, setFichero] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Input = styled("input")({
    display: "none",
  });

  async function getUserProfile() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };

      const response = await axios.get(
        `${REACT_APP_BACKEND_API}users/profile`,
        config
      );

      setUserProfile(response.data);
    } catch (error) {
      console.log("ERROR: ", error);
      setError(error);
    }
  }

  async function deleteAccount() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userSession}`,
        },
      };
      const { idUser } = userProfile;

      logout();

      await axios.delete(`${REACT_APP_BACKEND_API}users/${idUser}`, config);

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

  return (
    <div className="settings-container">
      <MenuProfile />
      <div className="settings-target">
        {userProfile ? (
          <Paper className="settings-paper" sx={{ padding: "44px" }}>
            <Paper elevation={6} className="header-settings">
              <div>
                {userProfile.image ? (
                  <img
                    className="img-settings"
                    src={userProfile.image}
                    alt="foto-perfil"
                  />
                ) : (
                  <img
                    className="img-settings"
                    src={defaultAvatar}
                    alt="foto-perfil"
                  />
                )}

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
              </div>
              <div>
                <h1>{userProfile.nameUser}</h1>
                <Rating name="read-only" value={4} readOnly />
                <p>{userProfile.bio}</p>
              </div>
            </Paper>
            <Formik
              initialValues={{
                email: userProfile.email,
                password: "",
                repeatedPassword: "",
                nameUser: userProfile.nameUser,
                bio: userProfile.bio,
                phone: userProfile.phone,
                province: userProfile.province,
              }}
              validate={(values) => {
                const errors = {};

                if (!values.email) {
                  errors.email = "Email requerido!";
                }

                if (!values.nameUser) {
                  errors.nameUser = "Nombre requerido!";
                } else if (values.nameUser.length > 25) {
                  errors.nameUser = "Nombre demasiado largo!";
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

                if (!values.province) {
                  error.province = "Selecciona tu provincia";
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
                const { nameUser, password, email, bio, phone, province } =
                  values;

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
                      province,
                    },
                    config
                  );

                  console.log("usuario modificado!: ", response.data);

                  const formData = new FormData();

                  formData.append("profileImage", fichero);

                  if (fichero) {
                    await axios.post(
                      `${REACT_APP_BACKEND_API}users/upload`,
                      formData,
                      config
                    );
                  }
                  getUserProfile();

                  navigate("/profile");
                  window.location.reload();
                } catch (error) {
                  setError(error);
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <h3>
                    <AssignmentIndOutlinedIcon /> Información personal{" "}
                  </h3>
                  <Paper elevation={6} sx={{ padding: "12px" }}>
                    <div className="field-container">
                      <TextField
                        theme={theme}
                        color="secondary"
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
                        theme={theme}
                        color="secondary"
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
                        theme={theme}
                        color="secondary"
                        id="province"
                        name="province"
                        label="Provincia"
                        variant="standard"
                        onChange={handleChange}
                        value={values.province}
                        error={errors.province && touched.province}
                        helperText={touched.province && errors.province}
                        fullWidth
                      />
                    </div>
                    <div className="field-container">
                      <TextField
                        theme={theme}
                        color="secondary"
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
                        theme={theme}
                        color="secondary"
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
                  </Paper>
                  <h3>
                    <SecurityOutlinedIcon /> Seguridad
                  </h3>
                  <Paper
                    elevation={6}
                    sx={{ padding: "12px", marginBottom: 1 }}
                  >
                    <div className="field-container">
                      <TextField
                        theme={theme}
                        color="secondary"
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
                        theme={theme}
                        color="secondary"
                        id="repeated-password"
                        name="repeatedPassword"
                        type={"password"}
                        label="Repetir Contraseña"
                        variant="standard"
                        onChange={handleChange}
                        value={values.repeatedPassword}
                        error={
                          errors.repeatedPassword && touched.repeatedPassword
                        }
                        helperText={
                          touched.repeatedPassword && errors.repeatedPassword
                        }
                        fullWidth
                      />
                    </div>
                  </Paper>
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
                        ¿Estas seguro de eliminar tu cuenta? Si confirmas no hay
                        vuelta atrás!
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button theme={theme} autoFocus onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button
                        theme={theme}
                        variant="contained"
                        onClick={deleteAccount}
                      >
                        Confirmar
                      </Button>
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
                      theme={theme}
                      sx={{
                        marginTop: 2,
                      }}
                    >
                      Confirmar
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
    </div>
  );
}

export default Settings;
