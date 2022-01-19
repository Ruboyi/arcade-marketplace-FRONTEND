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
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ListIcon from "@mui/icons-material/List";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadImages from "../../components/UploadImages/UploadImages";
import "./upload-products.css";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router";

function UploadProduct() {
  const navigate = useNavigate();

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
        {({ values, errors, touched, handleChange, handleSubmit }) => (
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
            <h2>Información</h2> <InfoIcon />
            <div className="titulo-precio">
              <TextField
                className="titulo-prducto"
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
                id="standard-multiline-static"
                label="Descripción del producto"
                multiline
                rows={4}
                variant="standard"
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
              />
              <AddLocationIcon className="logo-ubi" />
            </div>
            <UploadImages />
            {/* {errors.category &&
              errors.title &&
              errors.description &&
              errors.price &&
              errors.state &&
              errors.location} */}
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
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default UploadProduct;
