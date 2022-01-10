import { Link } from "react-router-dom";
import "./TapBar.css";
import Icon from "@mui/material/Icon";

function TapBar() {
  return (
    <nav className="tapBar-navigation">
      <div>
        <Link to={"/"}>
          <Icon className={"home-icon"}>home</Icon>
        </Link>
      </div>
      <div>
        {" "}
        <Link to={"/"}>
          <Icon className={"favorite-icon"}>favorite</Icon>
        </Link>
      </div>
      <div>
        {" "}
        <Link to={"/"}>
          <Icon className={"add-icon"}>add_circle</Icon>
        </Link>
      </div>
      <div>
        {" "}
        <Link to={"/login"}>
          <Icon className={"login-icon"}>account_circle</Icon>
        </Link>
      </div>
    </nav>
  );
}

export default TapBar;
