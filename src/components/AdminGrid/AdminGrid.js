import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BlockIcon from "@mui/icons-material/Block";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper, Snackbar, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import { forwardRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminGrid({ usersData, getAllUser }) {
  const navigate = useNavigate();
  const { userSession } = useAuthorization();
  const [backendResponse, setBackendResponse] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
        sx={{ position: "fixed", bottom: "65px", left: 0 }}
      />
    );
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${userSession}`,
    },
  };

  const handleBannerClick = (id) => async (event) => {
    event.stopPropagation();
    console.log(`Banneando a usuario con id: ${id}`);
    const data = {};
    try {
      const response = await axios.put(
        `${REACT_APP_BACKEND_API}users/${id}`,
        data,
        config
      );
      setBackendResponse(response.data.message);
      setOpen(true);
      getAllUser();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    console.log(`Borrando usuario con id: ${id}`);
    try {
      const response = await axios.delete(
        `${REACT_APP_BACKEND_API}users/${id}`,
        config
      );
      setBackendResponse(response.data.message);
      setOpen(true);
      getAllUser();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleNavigateClick = (id) => async (event) => {
    event.stopPropagation();
    console.log(`Redirigiendo a perfil del usuario:${id}`);
    try {
      const response = await axios.get(
        `${REACT_APP_BACKEND_API}users/user/${id}`
      );
      const { nameUser } = response.data;
      navigate(`/user/${nameUser}/${id}`);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    { field: "nameUser", headerName: "Nombre", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Teléfono", width: 100 },
    { field: "createdAt", headerName: "Fecha de alta", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 130,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AssignmentIndOutlinedIcon />}
            label="navigate"
            className="textPrimary"
            onClick={handleNavigateClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<BlockIcon sx={{ color: "red" }} />}
            label="Delete"
            onClick={handleBannerClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows = usersData;

  return (
    <>
      {usersData && (
        <Paper style={{ height: "100vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
          {backendResponse && (
            <Stack
              spacing={2}
              sx={{
                width: "100%",
                position: "fixed",
                top: "100px",
              }}
            >
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {backendResponse}
                </Alert>
              </Snackbar>
            </Stack>
          )}
          {error && (
            <Stack
              spacing={2}
              sx={{ width: "100%", position: "fixed", top: "100px" }}
            >
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  {error}
                </Alert>
              </Snackbar>
            </Stack>
          )}
        </Paper>
      )}
    </>
  );
}
