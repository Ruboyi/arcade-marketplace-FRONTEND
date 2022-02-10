import { CircularProgress } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

// import imgDefault from '../../assets/imagen_articulo_por_defecto.jpg';
import "./ProductsGrid.css";

function ProductsGrid({ products }) {
  let productsProcessed = products;
  const actualUrl = window.location.href;

  const position = actualUrl.search('/products')
  const slicedUrl = actualUrl.slice(position + 9)
  if (slicedUrl.includes('&')) {

    const replacedUrl = slicedUrl.replace('?', '')
    const splitedUrl = replacedUrl.split('&')
    const formattedQueries = {}
    splitedUrl.forEach(query => {
      const [key, value] = query.split('=')
      Object.assign(formattedQueries, { [key]: value })
      console.log(formattedQueries);
    })

    if (formattedQueries['category'] && formattedQueries['category'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.category === formattedQueries['category'])
    }

    if (formattedQueries['search'] && formattedQueries['search'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.title.toLowerCase().includes(formattedQueries['search'].toLocaleLowerCase()))
      console.log(productsProcessed);
    }

    if (formattedQueries['lowPrice'] && formattedQueries['lowPrice'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.price >= Number(formattedQueries['lowPrice']))
      console.log(productsProcessed);
    }

    if (formattedQueries['highPrice'] && formattedQueries['highPrice'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.price <= Number(formattedQueries['highPrice']))
    }
    if (formattedQueries['province'] && formattedQueries['province'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.province === formattedQueries['province'])
    }
    if (formattedQueries['status'] && formattedQueries['status'] !== 'undefined') {
      productsProcessed = productsProcessed.filter((product) =>
        product.state === formattedQueries['status'])
    }

  } else if (!slicedUrl.includes('&') && slicedUrl.includes('?')) {

    const replacedUrl = slicedUrl.replace('?', '')
    const formattedQueries = {}
    const [key, value] = replacedUrl.split('=')
    Object.assign(formattedQueries, { [key]: value })
    console.log(formattedQueries);

    if (formattedQueries['category']) {
      productsProcessed = productsProcessed.filter((product) =>
        product.category === formattedQueries['category'])
    }
    if (formattedQueries['search']) {
      productsProcessed = productsProcessed.filter((product) =>
        product.title.toLowerCase().includes(formattedQueries['search'].toLocaleLowerCase()))
    }

  }

  //! OLD CODE
  /* if (actualUrl.includes("search")) {
    const position = actualUrl.search("search=") + 7;
    let search = actualUrl.slice(position);
    if (search.includes('+')) {
      search = search.replace('+', ' ')
    }

    productsProcessed = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(productsProcessed);
  }
  if (actualUrl.includes("category")) {
    const position = actualUrl.search("category=") + 9;
    let search = actualUrl.slice(position);

    productsProcessed = products.filter((product) =>
      product.category.toLowerCase().includes(search.toLocaleLowerCase())
    );
    console.log(productsProcessed);
  }
 */
  //!

  console.log(productsProcessed);
  const isProductsAnArray = Array.isArray(productsProcessed);

  return (
    <div className="productGrid-card-container">

      {isProductsAnArray ? (
        productsProcessed.map((product) => <ProductCard key={product.idProduct} product={product} />)
      ) : (
        <CircularProgress />
      )}

    </div>
  );
}

export default ProductsGrid;
