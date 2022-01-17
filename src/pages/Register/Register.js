import {
  Alert,
  AlertTitle,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.jpg";
import "./register.css";

function Register() {
  const [backendResponse, setBackendResponse] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <header className="header-register">
        <img className="img-register" src={logo} alt="logo" />
        <h1>Regístrate</h1>
      </header>
      {!backendResponse && (
        <Paper
          className="register-container"
          style={{ backgroundColor: "#959CFC" }}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              repeatedPassword: "",
              nameUser: "",
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
              const { nameUser, password, email } = values;

              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/users/register",
                  {
                    nameUser,
                    password,
                    email,
                  }
                );

                console.log("usuario creado!: ", response.data);
                setBackendResponse(response.data);

                setTimeout(() => {
                  navigate("/login");
                }, 10000);
              } catch (error) {
                console.log(error.response.data);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="field-container">
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

                <div className="button-submit-container">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      marginRight: 3,
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#090D41",
                    }}
                  >
                    Regístrase
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Paper>
      )}
      {backendResponse && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Revisa la bandeja de entrada de tu correo y{" "}
            <strong>Comfirma tu cuenta !!</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Register;
