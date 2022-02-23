import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      sx={{ position: "fixed", bottom: "65px", left: 0 }}
      variant="filled"
      {...props}
    />
  );
});

export default function SnackbarSuccess({ message, open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "100%",
        left: "200px",
        position: "fixed",
        top: "100px",
        zIndex: 1200,
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
