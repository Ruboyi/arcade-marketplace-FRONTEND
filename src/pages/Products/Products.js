import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
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

function Products() {
  const [products, setProducts] = useState("");
  const [splitedUrl, setSplitedUrl] = useState();
  const navigate = useNavigate();
  const url = window.location.href;
  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();
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
        <div className="divFilters">
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenPrecio(true)}
            sx={{
              fontSize: " 0.7rem",
              textTransform: "capitalize",
              height: "30px",
              borderRadius: "15px",
            }}
          >
            {lowPrice && highPrice ? (
              <p>{`${lowPrice}€ - ${highPrice}€ `}</p>
            ) : (
              "Precio"
            )}
          </Button>
          <Dialog open={openPrecio} onClose={() => setOpenPrecio(false)}>
            <DialogTitle>¿Cuanto quieres pagar?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Elige lel rango de precio en el que deseas buscar
              </DialogContentText>
              <input
                placeholder="precio minimo SOLO NUMEROS"
                onChange={(event) => {
                  let priceData = event.target.value;
                  setLowPrice(priceData);
                }}
              />
              <input
                placeholder="precio maximo SOLO NUMEROS"
                onChange={(event) => {
                  let priceData = event.target.value;
                  setHighPrice(priceData);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setLowPrice("");
                  setHighPrice("");
                  setOpenPrecio(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  navigate(
                    `/products${splitedUrl}&lowPrice=${lowPrice}&highPrice=${highPrice}&province=${province}&status=${status}`
                  );
                  setOpenPrecio(false);
                }}
              >
                Aplicar
              </Button>
            </DialogActions>
          </Dialog>
          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenLocation(true)}
              sx={{
                fontSize: " 0.7rem",
                textTransform: "capitalize",
                height: "30px",
                borderRadius: "15px",
              }}
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
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    navigate(
                      `/products${splitedUrl}&lowPrice=${lowPrice}&highPrice=${highPrice}&province=${province}&status=${status}`
                    );
                    setOpenLocation(false);
                  }}
                >
                  Aplicar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenStatus(true)}
            sx={{
              fontSize: " 0.7rem",
              textTransform: "capitalize",
              height: "30px",
              borderRadius: "15px",
            }}
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
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  navigate(
                    `/products${splitedUrl}&lowPrice=${lowPrice}&highPrice=${highPrice}&province=${province}&status=${status}`
                  );
                  setOpenStatus(false);
                }}
              >
                Aplicar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Paper>
      <div className="productsGrid">
        {products ? <ProductsGrid products={products} /> : <CircularProgress />}
      </div>
    </>
  );
}
export default Products;
