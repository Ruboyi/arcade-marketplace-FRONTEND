import { DateTimePicker } from '@mui/lab';
import { Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import GoBack from '../../components/GoBack/GoBack';
import { useAuthorization } from '../../hooks/useAuthorization';

const { REACT_APP_BACKEND_API } = process.env;

function AcceptOrder({ idUserBuyer, idProduct }) {
  const navigate = useNavigate();
  const { userSession } = useAuthorization();
  // const [error, setError] = useState();
  const [saleDate, setSaleDate] = useState(new Date());

  useEffect(() => {
    if (!userSession) {
      navigate('/login');
    }
  }, [userSession, navigate]);

  return (
    <div>
      <Paper className='upload-product-form' style={{ backgroundColor: 'white', marginTop: '20px' }}>
        <Formik
          initialValues={{
            saleLocation: '',
            saleMessage: '',
            saleTypeOfContact: 'email'
          }}
          validate={(values) => {
            const errors = {};

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
            console.log('SUBMIT: ', saleDate, values);
            const { saleLocation, saleMessage, saleTypeOfContact } = values;

            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${userSession}`
                }
              };

              await axios.put(
                `${REACT_APP_BACKEND_API}orders/${idProduct}/${idUserBuyer}`,
                {
                  saleDate,
                  saleLocation,
                  saleMessage,
                  saleTypeOfContact
                },
                config
              );

              // setTimeout(() => {
              //   navigate('/profile'); // TODO NAVIGATE A MY PRODUCT ORDERS
              // }, 500);
            } catch (error) {
              // setError(error.response.data.error);
              console.log(error.response.data.error);
            }
          }}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <GoBack />
              <h1>Indica la información de encuentro</h1>
              {/* TODO TITULO DEL PRODUCTO  */}
              <h2>Título de anuncio</h2>
              <h3>Día y hora</h3>
              <div>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label='Fecha de venta'
                  value={saleDate}
                  onChange={(newDate) => {
                    setSaleDate(newDate);
                  }}
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
                  helperText={touched.saleLocation && errors.saleLocation}
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
              <FormControl>
                <FormLabel id='saleTypeOfContact'>Metodo de contacto</FormLabel>
                <RadioGroup
                  aria-labelledby='saleTypeOfContact'
                  defaultValue='email'
                  name='saleTypeOfContact'
                  onChange={handleChange}>
                  <FormControlLabel value='email' control={<Radio />} label='email' />
                  <FormControlLabel value='phone' control={<Radio />} label='phone' />
                </RadioGroup>
              </FormControl>

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
    </div>
  );
}

export default AcceptOrder;
