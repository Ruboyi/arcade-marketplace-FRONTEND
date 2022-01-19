import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ListIcon from "@mui/icons-material/List";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadImages from "../../components/UploadImages/UploadImages";
// import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import "./upload-product.css";
import { Formik, Form } from "formik";
//import axios from "axios";
// import { useState } from "react";

function UploadProduct() {
  // const [state, setState] = useState("");

  // const handlChange = (e) => {
  //   console.log(e.target.state);
  //   setState(e.target.state);
  // };

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
          /* const { category, title, description, price, state, location } =
            values; */

          /* try {
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
          } catch (error) {
            console.log(error.response.data);
          } */
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <ArrowBackIcon className="go-back" />
            <h2>
              Categoría <ListIcon />{" "}
            </h2>
            <FormControl>
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
            </FormControl>
            {/* <FormControl fullWidth>
              <Select
                id="category"
                name="state"
                label="Estado"
                variant="standard"
                value={values.category}
                onChange={handleChange}
              >
                <MenuItem>Consola</MenuItem>
                <MenuItem>Arcades</MenuItem>
                <MenuItem>Videojuegos</MenuItem>
                <MenuItem>Accesorios</MenuItem>
              </Select>
            </FormControl> */}
            Información <InfoIcon />
            <div className="titulo-precio">
              <TextField
                className="titulo-prducto"
                id="title"
                label="Título"
                variant="standard"
                onChange={handleChange}
                value={values.title}
              />

              <TextField
                id="price"
                label="Precio (€)"
                variant="standard"
                onChange={handleChange}
                value={values.price}
              />
            </div>
            {errors.email && touched.email && errors.email}
            <div>
              <TextField
                id="standard-multiline-static"
                label="Descriptción del producto"
                multiline
                rows={4}
                variant="standard"
                fullWidth
              />
              {/* <TextField
                multiline
                maxRows={4}
                className="product-description"
                id="description"
                label="Descripción"
                variant="standard"
                onChange={handleChange}
                value={values.description}
              /> */}
            </div>
            <div className="estado-localidad">
              <Box sx={{ minWidth: 120 }}>
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
              </Box>

              <TextField
                id="location"
                label="Localidad"
                variant="standard"
                onChange={handleChange}
                value={values.location}
              />
              <AddLocationIcon className="logo-ubi" />
            </div>
            <UploadImages />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Publicar
            </button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default UploadProduct;
