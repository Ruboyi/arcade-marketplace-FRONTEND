import {
  Alert,
  AlertTitle,
  Button,
  Paper,
  Stack,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import './login.css';
import logo from '../../assets/logosinfondo.png';
import { useAuthorization } from '../../hooks/useAuthorization';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  const { login, error, userSession } = useAuthorization();
  const navigate = useNavigate();
  useEffect(() => {
    if (userSession) {
      navigate('/profile');
    }
  }, [userSession, navigate]);
  return (
    <div>
      <header className='header-login'>
        <img className='img-login' src={logo} alt='logo' />
        <h1>Inicia sesión</h1>
      </header>
      {!userSession && (
        <Paper className='login-container'>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                errors.email = 'email requerido!';
              }

              if (!values.password) {
                errors.password = 'Contraseña requerida!';
              }

              return errors;
            }}
            onSubmit={async (values) => {
              login(values.email, values.password);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,

              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='field-container'>
                  <TextField
                    id='email'
                    name='email'
                    type='email'
                    label='Email'
                    variant='standard'
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </div>

                <div className='field-container'>
                  <TextField
                    id='password'
                    name='password'
                    type={'password'}
                    label='Password'
                    variant='standard'
                    onChange={handleChange}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </div>
                {error && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity='error'>
                      <AlertTitle>Error</AlertTitle>
                      {error}
                    </Alert>
                  </Stack>
                )}
                <div className='button-submit-container'>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: '#3742A3',
                      width: 200,
                      marginBottom: 1,
                      marginTop: 1
                    }}>
                    Login
                  </Button>
                  <div>
                    <Link to={'/register'}>
                      ¿Aún no tienes cuenta ? Registrate aquí!
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Paper>
      )}
      {userSession && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            Redireccionando a tu perfil... — <strong>Logueado!</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Login;
