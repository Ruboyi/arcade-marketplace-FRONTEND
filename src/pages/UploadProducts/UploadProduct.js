import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  Stack,
  Alert,
  AlertTitle,
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
import GoBack from "../../components/GoBack/GoBack";

const { REACT_APP_BACKEND_API } = process.env;

function UploadProduct() {
  const [fichero, setFichero] = useState();
  const navigate = useNavigate();
  const { userSession } = useAuthorization();
  const [error, setError] = useState();
  const [preview, setPreview] = useState();

  console.log(fichero);

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
  }, [userSession, navigate]);

  useEffect(() => {
    if (fichero) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(fichero);
    } else {
      setPreview(null);
    }
  }, [fichero]);
  console.log(fichero);

  return (
    <main>
      <GoBack />
      <Paper
        className="upload-product-form"
        style={{ backgroundColor: "white", marginTop: "20px" }}
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
              const config = {
                headers: {
                  Authorization: `Bearer ${userSession}`,
                },
              };
              const response = await axios.post(
                "http://localhost:3000/api/v1/products/",
                {
                  category,
                  title,
                  description,
                  price,
                  state,
                  location,
                },
                config
              );

              const { productId } = response.data;

              const formData = new FormData();

              formData.append("productImage", fichero);

              await axios.post(
                `${REACT_APP_BACKEND_API}products/images/${productId}`,
                formData,
                config
              );

              setTimeout(() => {
                navigate("/products");
              }, 10000);
            } catch (error) {
              setError(error.response.data.error);
            }
          }}
        >
          {/* TODO Radials no funcionan */}
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h2>
                Categoría <ListIcon />{" "}
              </h2>
              <div>
                <label>
                  <Field type="radio" name="category" value="consolas" />{" "}
                  Consola
                </label>
                <label>
                  <Field type="radio" name="category" value="arcades" /> Arcades
                </label>
                <label>
                  <Field type="radio" name="category" value="videojuegos" />{" "}
                  Videojuegos
                </label>
                <label>
                  <Field type="radio" name="category" value="accesorios" />{" "}
                  Accesorios
                </label>
              </div>
              <h2>Información</h2> <InfoIcon />
              <div className="titulo-precio">
                <TextField
                  margin="dense"
                  sx={{ marginRight: 1 }}
                  className="titulo-producto"
                  id="title"
                  label="Título"
                  variant="outlined"
                  onChange={handleChange}
                  value={values.title}
                  error={errors.title && touched.title}
                  helperText={touched.title && errors.title}
                />

                <TextField
                  margin="dense"
                  id="price"
                  label="Precio (€)"
                  variant="outlined"
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
                  margin="dense"
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
                <FormControl
                  fullWidth
                  margin="dense"
                  sx={{ marginRight: 1 }}
                  variant="outlined"
                >
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
                    <MenuItem value={"nuevo"}>Nuevo</MenuItem>
                    <MenuItem value={"seminuevo"}>Seminuevo</MenuItem>
                    {/* <MenuItem value={"buen estado"}>Buen estado</MenuItem> */}
                    <MenuItem value={"usado"}>Usado</MenuItem>
                    {/* <MenuItem value={"Malas condiciones"}>
                    Malas condiciones
                  </MenuItem> */}
                  </Select>
                </FormControl>

                <TextField
                  margin="dense"
                  id="location"
                  label="Localidad"
                  variant="outlined"
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
                      required
                      multiple
                      accept="image/*"
                      type={"file"}
                      onChange={(event) => {
                        const file = event.target.files[0];
                        if (file && file.type.substr(0, 5) === "image") {
                          setFichero(file);
                        } else {
                          setFichero(null);
                        }

                        setFichero(file);
                      }}
                    />
                  </label>
                  {fichero && (
                    <div>
                      <img className="img-preview" src={preview} alt="img" />
                    </div>
                  )}
                </div>
              </div>
              {error && (
                <Stack sx={{ width: "100%", margin: 1 }} spacing={2}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </Stack>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#3742A3",
                  width: 200,
                  marginBottom: 1,
                  marginTop: 2,
                }}
              >
                Publicar
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </main>
  );
}

export default UploadProduct;
