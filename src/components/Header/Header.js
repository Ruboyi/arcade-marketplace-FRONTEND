import { InputAdornment, TextField } from "@mui/material";
import logo from "../../assets/small-logo.jpg";
import SearchIcon from "@mui/icons-material/Search";

import "./Header.css";

function Header() {
  return (
    <header className="header-principal">
      <img className="small-logo" src={logo} alt="small-logo" />
      <TextField
        id="input-with-icon-textfield"
        label="Buscar"
        placeholder="Buscar"
        sx={{
          backgroundColor: "white",
          borderRadius: "4px",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </header>
  );
}

export default Header;
