import {
  Alert,
  AlertTitle,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import "./login.css";
import logo from "../../assets/logosinfondo.png";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import GoBack from "../../components/GoBack/GoBack";
import GoogleLogin from "react-google-login";
import theme from "../../theme/theme";

function Login() {
  const { login, error, userSession, isAdmin } = useAuthorization();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAdmin);
    if (userSession) {
      navigate("/profile");
    }
    if (isAdmin) {
      navigate("/admin");
    }
  }, [userSession, navigate, isAdmin]);

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <header className="header-login">
        <img className="img-login" src={logo} alt="logo" />
        <h1>Inicia sesión</h1>
      </header>
      <GoBack />
      {!userSession && (
        <Paper className="login-container">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = "email requerido!";
              }

              if (!values.password) {
                errors.password = "Contraseña requerida!";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              login(values.email, values.password);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,

              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="field-container">
                  <TextField
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
                    theme={theme}
                  />
                </div>

                <div className="field-container">
                  <TextField
                    color="secondary"
                    id="password"
                    name="password"
                    type={"password"}
                    label="Password"
                    variant="standard"
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    fullWidth
                    theme={theme}
                  />
                </div>
                {error && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
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
                      width: 200,
                      marginBottom: 1,
                      marginTop: 1,
                    }}
                  >
                    Login
                  </Button>
                  <div>
                    <Link to={"/register"}>
                      ¿Aún no tienes cuenta ? Registrate aquí!
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <GoogleLogin
            clientId="545228991511-smtjvog63lcuf028rddc2gjf0qtg3vn4.apps.googleusercontent.com"
            buttonText="Inicia Session"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          ,
        </Paper>
      )}
      {userSession && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Redireccionando a tu perfil... — <strong>Logueado!</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Login;
