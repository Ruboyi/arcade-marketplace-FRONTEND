import logo from "../../assets/joy.png";

import "./Header.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


function Header() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isActualUrlProducts, setIsActualUrlProducts] = useState()
  const navigate = useNavigate()
  let actualUrl = window.location.href

  useEffect(() => {
    setIsActualUrlProducts(actualUrl.startsWith('http://localhost:3001/products') || actualUrl.startsWith('http://localhost:3001/my-favorites'))
  }, [setIsActualUrlProducts, actualUrl])
  return (
    <header className="header-principal">
      <img className="small-logo" src={logo} alt="small-logo" />
      {isActualUrlProducts ? (<input
        placeholder="Filtrar"
        value={searchParams.get("search") || ""}
        onChange={event => {
          let search = event.target.value;
          if (search) {
            setSearchParams({ search });
          } else {
            setSearchParams({});
          }
        }}
      />) : (<input
        placeholder='Buscar'
        value={searchParams.get("search") || ""}
        onChange={event => {
          let search = event.target.value;
          if (search) {
            setSearchParams({ search });
          } else {
            setSearchParams({});
          }
        }}
      />)}
      {isActualUrlProducts ? (null) : (<button onClick={() => navigate(`/products?${searchParams}`)}>Lupa</button>)}
    </header>
  );
}

export default Header;
