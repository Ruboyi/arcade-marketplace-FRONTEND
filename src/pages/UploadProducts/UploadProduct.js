import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ListIcon from "@mui/icons-material/List";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import "./upload-products.css";
import { Formik, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuthorization } from "../../hooks/useAuthorization";

function UploadProduct() {
  const [fichero, setFichero] = useState();
  const navigate = useNavigate();
  const { userSession } = useAuthorization();

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
  }, [userSession, navigate]);

  console.log(fichero);
  return (
    <Paper
      className="upload-product-form"
      style={{ backgroundColor: "#959CFC" }}
    >
      <Formik
        initialValues={{
          category: "",
          title: "",
          description: "",
          price: "",
          state: "",
          location: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = "Título Required";
          }
          if (!values.description) {
            errors.description = "description Required";
          }
          if (!values.price) {
            errors.price = "price Required";
          }
          if (!values.state) {
            errors.state = "state Required";
          }
          if (!values.location) {
            errors.location = "location Required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          console.log("SUBMIT: ", values);
          const { category, title, description, price, state, location } =
            values;

          try {
            const response = await axios.post(
              "http://localhost:3000/upload-products",
              {
                category,
                title,
                description,
                price,
                state,
                location,
              }
            );

            console.log(response.data);

            setTimeout(() => {
              navigate("/products");
            }, 10000);
          } catch (error) {
            console.log(error.response.data);
          }
        }}
      >
        {/* TODO Radials no funcionan */}
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <button
              className="goBack-button"
              onClick={() => navigate("/profile")}
            >
              Atras
            </button>
            <h2>
              Categoría <ListIcon />{" "}
            </h2>
            <div>
              <label>
                <Field type="radio" name="category" value="consola" /> Consola
              </label>
              <label>
                <Field type="radio" name="category" value="arcades" /> Arcades
              </label>
              <label>
                <Field type="radio" name="category" value="videojuegos" />{" "}
                Consola
              </label>
              <label>
                <Field type="radio" name="category" value="accesorios" />{" "}
                Accesorios
              </label>
            </div>
            {/* <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="consola"
                  control={<Radio />}
                  label="consola"
                />

                <FormControlLabel
                  value="arcades"
                  control={<Radio />}
                  label="arcades"
                />
                <FormControlLabel
                  value="videojuegos"
                  control={<Radio />}
                  label="videojuegos"
                />
                <FormControlLabel
                  value="accesorios"
                  control={<Radio />}
                  label="accesorios"
                />
              </RadioGroup>
            </FormControl> */}
            <h2>Información</h2> <InfoIcon />
            <div className="titulo-precio">
              <TextField
                className="titulo-producto"
                id="title"
                label="Título"
                variant="standard"
                onChange={handleChange}
                value={values.title}
                error={errors.title && touched.title}
                helperText={touched.title && errors.title}
              />

              <TextField
                id="price"
                label="Precio (€)"
                variant="standard"
                onChange={handleChange}
                value={values.price}
                error={errors.price && touched.price}
                helperText={touched.price && errors.price}
              />
            </div>
            {/* {errors.category &&
              errors.title &&
              errors.description &&
              errors.price &&
              errors.state &&
              errors.location} */}
            <div>
              <TextField
                id="description"
                label="Descripción del producto"
                multiline
                rows={4}
                variant="outlined"
                onChange={handleChange}
                value={values.description}
                error={errors.description && touched.description}
                helperText={touched.description && errors.description}
                fullWidth
              />
            </div>
            <div className="estado-localidad">
              <FormControl fullWidth>
                <InputLabel id="state">Estado</InputLabel>

                <Select
                  className="estado"
                  value={values.state}
                  id="state"
                  name="state"
                  label="Estado"
                  variant="standard"
                  onChange={handleChange}
                  error={errors.state && touched.state}
                  state
                >
                  <MenuItem value="" disabled>
                    Selecciona el estado del producto
                  </MenuItem>
                  <MenuItem value={"Nuevo"}>Nuevo</MenuItem>
                  <MenuItem value={"Seminuevo"}>Seminuevo</MenuItem>
                  <MenuItem value={"Buen estado"}>Buen estado</MenuItem>
                  <MenuItem value={"Usado"}>Usado</MenuItem>
                  <MenuItem value={"Malas condiciones"}>
                    Malas condiciones
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="location"
                label="Localidad"
                variant="standard"
                onChange={handleChange}
                value={values.location}
                error={errors.location && touched.location}
                helperText={touched.location && errors.location}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AddLocationIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {/* {errors.category &&
              errors.title &&
              errors.description &&
              errors.price &&
              errors.state &&
            errors.location} */}
            <div>
              <h2>Subir imagen</h2>
              <div>
                <label>
                  Imagen:{" "}
                  <input
                    multiple
                    type={"file"}
                    onChange={(event) => {
                      const fichero = event.target.files[0];
                      setFichero(fichero);
                    }}
                  />
                </label>
              </div>
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#3742A3",
                width: 200,
                marginBottom: 1,
                marginTop: 1,
              }}
            >
              Publicar
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
}

export default UploadProduct;
