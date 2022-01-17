import { Alert, AlertTitle, Button, Paper, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import logo from '../../assets/logo.jpg';

function Login() {
  const { REACT_APP_BACKEND_API } = process.env;
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [error, setError] = useState('');
  return (
    <div>
      <header className="header-login">
        <img className="img-login" src={logo} alt="logo" />
        <h1>Inicia sesión</h1>
      </header>
      {!token && (
        <Paper className='login-container' style={{ backgroundColor: '#959CFC' }}>
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
              try {
                const response = await axios.post(`${REACT_APP_BACKEND_API}users/login`, values);

                setToken(response.data.accessToken);
                setTimeout(() => {
                  navigate('/profile');
                }, 10000);
              } catch (error) {
                console.log('Error: ', error);
                setError(error);
              }
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
                {error && !token && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity='error'>
                      <AlertTitle>Error</AlertTitle>
                      No existe un usuario con ese email y/o password !
                      {/* FALTA EL ERROR DE QUE NO HAYA VERIFICADO SU CUENTA TODAVIA  O QUE DEL SERVIDOR NO FUNCION*/}
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
                    <Link to={'/register'}>¿Aún no tienes cuenta ? Registrate aquí!</Link>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </Paper>
      )}
      {token && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            Redireccionando a tu perfil.. — <strong>Logueado !!</strong>
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default Login;
