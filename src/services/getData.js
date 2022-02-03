import axios from "axios";

const { REACT_APP_BACKEND_API } = process.env;

async function getProducts() {
  const response = await axios.get(`${REACT_APP_BACKEND_API}products`);
  const productos = response.data.data;
  return productos;
}

export { getProducts };
