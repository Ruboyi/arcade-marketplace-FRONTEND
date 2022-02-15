import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import { getProducts } from "../../services/getData";
import { Paper } from "@mui/material";
import consolasLogo from "../../assets/gameboy.png";
import videojuegosLogo from "../../assets/cd.png";
import accesoriosLogo from "../../assets/gamepad.png";
import arcadesLogo from "../../assets/arcade.png";
import "./Products.css";
import provinceData from "../../services/provinceData";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import theme from "../../theme/theme";

function priceText(price) {
  return `${price}€`;
}

const marks = [
  {
    value: 0,
    label: "0€",
  },
  {
    value: 20,
    label: "200€",
  },
  {
    value: 50,
    label: "500€",
  },
  {
    value: 100,
    label: "1000€",
  },
];

function Products() {
  const [products, setProducts] = useState("");
  const [splitedUrl, setSplitedUrl] = useState();
  const navigate = useNavigate();
  const url = window.location.href;
  const [price, setPrice] = useState([20, 80]);
  const [province, setProvince] = useState("");
  const [status, setStatus] = useState();
  const [openLocation, setOpenLocation] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openPrecio, setOpenPrecio] = useState(false);

  useEffect(() => {
    async function getData() {
      const products = await getProducts();
      setProducts(products);
    }
    const position = window.location.href.search("products");
    if (window.location.href.includes("&")) {
      const preSplitUrl = window.location.href.split("&");
      setSplitedUrl(`${preSplitUrl[0].slice(position + 8)}`);
    } else {
      setSplitedUrl(`${window.location.href.slice(position + 8)}`);
    }
    getData();
  }, [url]);

  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };
  const urlFilter = `/products${splitedUrl}&lowPrice=${
    price[0] * 10
  }&highPrice=${price[1] * 10}&province=${province}&status=${status}`;

  return (
    <>
      <Paper
        elevation={2}
        sx={{ maxHeight: "200px", position: "fixed", width: "100%" }}
      >
        <nav className="categories">
          <div>
            <a href="/products?category=consolas">
              <img src={consolasLogo} alt="consolas logo"></img>Consolas
            </a>
          </div>
          <div>
            <a href="/products?category=videojuegos">
              <img src={videojuegosLogo} alt="videojuegos logo"></img>
              Videojuegos
            </a>
          </div>
          <div>
            <a href="/products?category=accesorios">
              <img src={accesoriosLogo} alt="accesorios logo"></img>Accesorios
            </a>
          </div>
          <div>
            <a href="/products?category=arcades">
              {" "}
              <img src={arcadesLogo} alt="arcades logo"></img>Arcades
            </a>
          </div>
        </nav>
        <Divider />
        <div className="divFilters">
          <div className="buttoms-filters">
            <Button
              variant="outlined"
              size="small"
              theme={theme}
              onClick={() => setOpenPrecio(true)}
              sx={{
                fontSize: " 0.7rem",
                textTransform: "capitalize",
                height: "30px",
                borderRadius: "15px",
                alignSelf: "center",
              }}
              startIcon={<PaidOutlinedIcon />}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {price ? (
                <p>{`${price[0] * 10}€ - ${price[1] * 10}€ `}</p>
              ) : (
                "Precio"
              )}
            </Button>
            <Dialog open={openPrecio} onClose={() => setOpenPrecio(false)}>
              <DialogTitle>¿Cuanto quieres pagar?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Elige lel rango de precio en el que deseas buscar.
                </DialogContentText>
                <Slider
                  getAriaLabel={() => "Prize"}
                  value={price}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={priceText}
                  sx={{ marginTop: 3, marginBottom: 3 }}
                  marks={marks}
                  theme={theme}
                />
                <InputLabel htmlFor="Desde">Desde</InputLabel>
                <OutlinedInput
                  size="small"
                  theme={theme}
                  label="Desde"
                  id="Desde"
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                  defaultValue={0}
                  value={price[0] * 10}
                />
                <InputLabel htmlFor="Hasta">Hasta</InputLabel>
                <OutlinedInput
                  size="small"
                  label="Hasta"
                  id="Hasta"
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                  defaultValue={1000}
                  value={price[1] * 10}
                  theme={theme}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setPrice([0, 100]);
                    setOpenPrecio(false);
                  }}
                  theme={theme}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    navigate(urlFilter);
                    setOpenPrecio(false);
                  }}
                  theme={theme}
                >
                  Aplicar
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenLocation(true)}
              sx={{
                fontSize: " 0.7rem",
                textTransform: "capitalize",
                height: "30px",
                borderRadius: "15px",
                alignSelf: "center",
              }}
              startIcon={<AddLocationAltOutlinedIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              theme={theme}
            >
              {province ? <p>{province}</p> : "Localizacion"}
            </Button>
            <Dialog open={openLocation} onClose={() => setOpenLocation(false)}>
              <DialogTitle>¿Donde?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Elige la zona la provincia donde estas buscando
                </DialogContentText>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  sx={{ margin: 1, width: "100%" }}
                  theme={theme}
                >
                  {provinceData.map((province) => (
                    <MenuItem key={province.id} value={province.nm}>
                      {province.nm}
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setProvince("");
                    setOpenLocation(false);
                  }}
                  theme={theme}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    navigate(urlFilter);
                    setOpenLocation(false);
                  }}
                  theme={theme}
                >
                  Aplicar
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenStatus(true)}
              sx={{
                fontSize: " 0.7rem",
                textTransform: "capitalize",
                height: "30px",
                borderRadius: "15px",
                alignSelf: "center",
              }}
              startIcon={<FlareOutlinedIcon />}
              endIcon={<KeyboardArrowDownIcon />}
              theme={theme}
            >
              {status ? <p>{status}</p> : "Estado"}
            </Button>
            <Dialog open={openStatus} onClose={() => setOpenStatus(false)}>
              <DialogTitle>¿En que estado esta tu producto?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Elige la opción que mejor encaje con el estado de tu producto
                </DialogContentText>
                <InputLabel id="status">Estado</InputLabel>
                <Select
                  labelId="status"
                  id="status"
                  label="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ margin: 1, width: "100%" }}
                  theme={theme}
                >
                  <MenuItem value={"nuevo"}>Nuevo</MenuItem>
                  <MenuItem value={"seminuevo"}>Seminuevo</MenuItem>
                  <MenuItem value={"usado"}>Usado</MenuItem>
                </Select>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setStatus("");
                    setOpenStatus(false);
                  }}
                  theme={theme}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    navigate(urlFilter);
                    setOpenStatus(false);
                  }}
                  theme={theme}
                >
                  Aplicar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Paper>
      <div className="productsGrid">
        {products ? <ProductsGrid products={products} /> : <CircularProgress />}
      </div>
    </>
  );
}
export default Products;
