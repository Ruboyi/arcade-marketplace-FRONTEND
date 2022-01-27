import logo from "../../assets/joy.png";

import "./Header.css";
import { useNavigate, useSearchParams } from "react-router-dom";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <header className="header-principal">
      <img className="small-logo" src={logo} alt="small-logo" />
      <input
        value={searchParams.get("search") || ""}
        onChange={event => {
          let search = event.target.value;
          if (search) {
            setSearchParams({ search });
          } else {
            setSearchParams({});
          }
        }}
      />
      <button onClick={() => navigate(`/products?${searchParams}`)}>Lupa</button>
    </header>
  );
}

export default Header;
