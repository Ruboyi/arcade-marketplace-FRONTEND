import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

import { useNavigate } from "react-router-dom";

export default function MenuAdmin() {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        width: 200,
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "white",
        textAlign: "left",
        position: "fixed",
        top: "77px",
      }}
    >
      <MenuList>
        <MenuItem onClick={() => navigate("/admin/users")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText>Usuarios</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/admin/products")}>
          <ListItemIcon>
            <LocalOfferOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Productos</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/admin/reports")}>
          <ListItemIcon>
            <EventAvailableOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Reportes</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
