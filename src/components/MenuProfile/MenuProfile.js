import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useNavigate } from "react-router-dom";

export default function MenuProfile() {
  const { logout } = useAuthorization();
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        width: 200,
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "rgb(0, 17, 73)",
        color: "white",
        textAlign: "left",
        position: "fixed",
        zIndex: "1100",
        top: "70px",
      }}
    >
      <MenuList>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/my-products")}>
          <ListItemIcon>
            <LocalOfferOutlinedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Mis productos</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/my-orders")}>
          <ListItemIcon>
            <EventAvailableOutlinedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Mis reservas</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/my-reviews")}>
          <ListItemIcon>
            <StarBorderPurple500OutlinedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Opiniones</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/settings")}>
          <ListItemIcon>
            <SettingsOutlinedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Ajustes</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
