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
import logo from "../../assets/logosinfondo.png";
import GoBack from "../../components/GoBack/GoBack";
import theme from "../../theme/theme";
import GoogleLogin from "react-google-login";
import "./register.css";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const [backendResponse, setBackendResponse] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [recaptcha, setRecaptcha] = useState();

  function onChange(value) {
    console.log("Captcha value:", value);
    setRecaptcha(value);
  }

  const responseGoogle = async (response) => {
    //console.log(response);
    console.log(response);
    const nameUser = response.Ju.tf;
    const image = response.Ju.AN;
    const email = response.Ju.zv;
    const password = "123456";

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        {
          nameUser,
          password,
          email,
          image,
        }
      );

      console.log("usuario creado!: ", response.data);
      setBackendResponse(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <header className="header-register">
        <img className="img-register" src={logo} alt="logo" />
        <h1>Regístrate</h1>
      </header>
      <GoBack />
      {!backendResponse && (
        <Paper className="register-container">
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
              if (!recaptcha) {
                setError("Por favor verifica que no eres un robot");
                return;
              }

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
                }, 1000);
              } catch (error) {
                setError(error.response.data.error);
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
                    theme={theme}
                    color="secondary"
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
                    theme={theme}
                    color="secondary"
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
                    theme={theme}
                    color="secondary"
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
                    theme={theme}
                    color="secondary"
                  />
                </div>
                {error && (
                  <Stack sx={{ width: "100%", margin: 1 }} spacing={2}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Stack>
                )}
                <div className="recaptcha">
                  <ReCAPTCHA
                    sitekey="6LfhsaYeAAAAAOrdwGKpY7YVkvzveGZmj7oZPoxm"
                    onChange={onChange}
                  />
                </div>
                <div className="button-submit-container">
                  <Button
                    type="submit"
                    variant="contained"
                    theme={theme}
                    sx={{ marginRight: 1 }}
                  >
                    Regístrase
                  </Button>
                  <GoogleLogin
                    clientId="545228991511-smtjvog63lcuf028rddc2gjf0qtg3vn4.apps.googleusercontent.com"
                    buttonText="Registrate con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
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
            <strong>Confirma tu cuenta !!</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Register;
