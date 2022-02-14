import { CircularProgress, InputLabel, MenuItem, Select } from "@mui/material";
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
  const [province, setProvince] = useState();
  const [status, setStatus] = useState();

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
      <Paper elevation={2} sx={{ maxHeight: "200px", position: "fixed" }}>
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
          <div>
            <InputLabel id="demo-simple-select-label">Provincia</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              {provinceData.map((province) => (
                <MenuItem key={province.id} value={province.nm}>
                  {province.nm}
                </MenuItem>
              ))}
            </Select>
          </div>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"nuevo"}>Nuevo</MenuItem>
            <MenuItem value={"seminuevo"}>Seminuevo</MenuItem>
            <MenuItem value={"usado"}>Usado</MenuItem>
          </Select>

          <button
            onClick={() =>
              navigate(
                `/products${splitedUrl}&lowPrice=${lowPrice}&highPrice=${highPrice}&province=${province}&status=${status}`
              )
            }
          >
            Filtrar
          </button>
        </div>
      </Paper>
      <div className="productsGrid">
        {products ? <ProductsGrid products={products} /> : <CircularProgress />}
      </div>
    </>
  );
}
export default Products;
