import {
  Paper,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
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
import theme from "../../theme/theme";
import provinceData from "../../services/provinceData";
import { DropzoneArea } from "material-ui-dropzone";
/* import MenuProfile from "../../components/MenuProfile/MenuProfile"; */

const { REACT_APP_BACKEND_API } = process.env;

function UploadProduct() {
  const navigate = useNavigate();
  const { userSession } = useAuthorization();
  const [error, setError] = useState();
  const [files, setFiles] = useState();

  console.log(files);

  useEffect(() => {
    if (!userSession) {
      navigate("/login");
    }
  }, [userSession, navigate]);

  return (
    <div className="div-upload-product">
      <main className="main-upload-product">
        {/* <MenuProfile /> */}
        <Paper
          className="upload-product-form"
          sx={{
            backgroundColor: "white",
            marginTop: "20px",
          }}
        >
          <Formik
            initialValues={{
              category: "",
              title: "",
              description: "",
              price: "",
              state: "",
              location: "",
              province: "",
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
              if (!values.province) {
                errors.province = "location Required";
              }

              return errors;
            }}
            onSubmit={async (values) => {
              console.log("SUBMIT: ", values);
              const {
                category,
                title,
                description,
                price,
                state,
                location,
                province,
              } = values;

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
                    province,
                  },
                  config
                );

                const { productId } = response.data;

                const formData = new FormData();

                for (const file of files) {
                  formData.append("productImage", file);
                }

                await axios.post(
                  `${REACT_APP_BACKEND_API}products/images/${productId}`,
                  formData,
                  config
                );

                setTimeout(() => {
                  navigate("/products");
                }, 1000);
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
                <Paper elevation={3} sx={{ padding: "12px" }}>
                  <label>
                    <Field type="radio" name="category" value="consolas" />{" "}
                    Consola
                  </label>
                  <label>
                    <Field type="radio" name="category" value="arcades" />{" "}
                    Arcades
                  </label>
                  <label>
                    <Field type="radio" name="category" value="videojuegos" />{" "}
                    Videojuegos
                  </label>
                  <label>
                    <Field type="radio" name="category" value="accesorios" />{" "}
                    Accesorios
                  </label>
                </Paper>
                <div className="div-imformacion">
                  <h2>Información</h2>
                  <InfoIcon sx={{ alignSelf: "center" }} />
                </div>
                <Paper elevation={3} sx={{ padding: "12px" }}>
                  <div className="titulo-precio">
                    <TextField
                      theme={theme}
                      color="secondary"
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
                      theme={theme}
                      color="secondary"
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
                  <div>
                    <TextField
                      theme={theme}
                      color="secondary"
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
                      theme={theme}
                      color="secondary"
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
                        variant="outlined"
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

                    <FormControl
                      sx={{ marginRight: 1 }}
                      theme={theme}
                      color="secondary"
                      fullWidth
                      margin="dense"
                      variant="outlined"
                    >
                      <InputLabel id="demo-simple-select-label">
                        Provincia
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Provincia"
                        name="province"
                        color="secondary"
                        onChange={handleChange}
                        value={values.province}
                        theme={theme}
                        variant="outlined"
                        error={errors.province && touched.province}
                        state
                      >
                        <MenuItem value="" disabled>
                          Selecciona una provincia
                        </MenuItem>
                        {provinceData.map((province) => (
                          <MenuItem key={province.id} value={`${province.nm}`}>
                            {province.nm}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      theme={theme}
                      color="secondary"
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
                </Paper>
                <div>
                  <h2>Subir imagen</h2>
                  <Paper elevation={3} sx={{ padding: "12px" }}>
                    <DropzoneArea onChange={(file) => setFiles(file)} />
                  </Paper>
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
                  theme={theme}
                  type="submit"
                  variant="contained"
                  sx={{
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
    </div>
  );
}

export default UploadProduct;
