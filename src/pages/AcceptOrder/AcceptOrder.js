import { Button, Paper, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuthorization } from '../../hooks/useAuthorization';

const { REACT_APP_BACKEND_API } = process.env;

function AcceptOrder() {
  const navigate = useNavigate();
  const { userSession } = useAuthorization();
  const [error, setError] = useState();
  const { idProduct, idUser } = useParams();

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }
  }, [userSession, navigate]);

  return (
    <div>
      {error ? (
        <div>{error}</div> // TODO PINTAR BIEN EL ERROR SI LO HAY
      ) : (
        <Paper
          className='upload-product-form'
          style={{ backgroundColor: 'white', marginTop: '20px' }}>
          <Formik
            initialValues={{
              saleDate: '',
              saleLocation: '',
              saleMessage: '',
              saleTypeOfContact: ''
            }}
            validate={(values) => {
              const errors = {};

              if (!values.saleDate) {
                errors.saleDate = 'Día de venta requerida';
              }
              if (!values.saleLocation) {
                errors.saleLocation = 'Localización requerida';
              }
              if (!values.saleMessage) {
                errors.saleMessage = 'Mensaje requerido';
              }
              if (!values.saleTypeOfContact) {
                errors.saleTypeOfContact = 'Tipo de contacto requerido';
              }
              return errors;
            }}
            onSubmit={async (values) => {
              console.log('SUBMIT: ', values);
              const {
                saleDate,
                saleLocation,
                saleMessage,
                saleTypeOfContact
              } = values;

              try {
                const config = {
                  headers: {
                    Authorization: `Bearer ${userSession}`
                  }
                };

                await axios.post(
                  `${REACT_APP_BACKEND_API}orders/${idProduct}/${idUser}`,
                  {
                    saleDate,
                    saleLocation,
                    saleMessage,
                    saleTypeOfContact
                  },
                  config
                );

                setTimeout(() => {
                  navigate('/profile'); // TODO NAVIGATE A MY PRODUCT ORDERS
                }, 500);
              } catch (error) {
                setError(error.response.data.error);
              }
            }}>
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {/* <button>Atras</button> TODO IMPORT GOBACK COMPONENT */}
                <h1>Indica la información de encuentro</h1>
                <h2>Título de anuncio</h2>
                <h3>Día y hora</h3>
                <div>
                  <TextField
                    margin='dense'
                    id='saleDate'
                    placeholder='Lunes 15/12 - 14:30h'
                    variant='outlined'
                    onChange={handleChange}
                    value={values.saleDate}
                    error={errors.saleDate && touched.saleDate}
                    helperText={touched.saleDate && errors.saleDate}
                    fullWidth
                  />
                </div>
                <h3>Ubicación</h3>

                <div>
                  <TextField
                    margin='dense'
                    id='saleLocation'
                    placeholder='Parque Europa, A Coruña'
                    variant='outlined'
                    onChange={handleChange}
                    value={values.saleLocation}
                    error={errors.saleLocation && touched.saleLocation}
                    helperText={
                      touched.saleLocation && errors.saleLocation
                    }
                    fullWidth
                  />
                </div>

                <h3>Mensaje</h3>
                <div>
                  <TextField
                    margin='dense'
                    id='saleMessage'
                    placeholder='Lleva el dinero justo que no tengo cambio'
                    multiline
                    rows={4}
                    variant='outlined'
                    onChange={handleChange}
                    value={values.saleMessage}
                    error={errors.saleMessage && touched.saleMessage}
                    helperText={touched.saleMessage && errors.saleMessage}
                    fullWidth
                  />
                </div>

                <h3>Método de contacto</h3>
                <div>
                  <TextField
                    margin='dense'
                    id='saleTypeOfContact'
                    placeholder='delbetishastalamuerte@gmail.com / 645 34 67 89'
                    variant='outlined'
                    onChange={handleChange}
                    value={values.saleTypeOfContact}
                    error={
                      errors.saleTypeOfContact && touched.saleTypeOfContact
                    }
                    helperText={
                      touched.saleTypeOfContact && errors.saleTypeOfContact
                    }
                    fullWidth
                  />
                </div>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    backgroundColor: '#3742A3',
                    width: 200,
                    marginBottom: 1,
                    marginTop: 2
                  }}>
                  Publicar
                </Button>
              </form>
            )}
          </Formik>
        </Paper>
      )}
    </div>
  );
}

export default AcceptOrder;
