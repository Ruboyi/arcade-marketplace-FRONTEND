import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper, Snackbar, Stack } from "@mui/material";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";
import { forwardRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminReportsGrid({ reportsData, getAllReports }) {
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

  const handleDeleteClick = (id) => async (event) => {
    event.stopPropagation();
    console.log(`Borrando reporte con id: ${id}`);
    try {
      const response = await axios.delete(
        `${REACT_APP_BACKEND_API}reports/${id}`,
        config
      );
      setBackendResponse(response.data.message);
      setOpen(true);
      getAllReports();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    { field: "idProduct", headerName: "Producto (id)", width: 120 },
    { field: "idUser", headerName: "Usuario (id)", width: 120 },
    { field: "reason", headerName: "Motivo", width: 220 },
    { field: "description", headerName: "Descripción", width: 300 },
    { field: "reportDate", headerName: "Fecha del reporte", width: 180 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 130,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
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
  const rows = reportsData;

  return (
    <>
      {reportsData && (
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
                left: "200px",
                position: "fixed",
                top: "100px",
                zIndex: 1200,
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
              sx={{
                width: "100%",
                position: "fixed",
                top: "100px",
                zIndex: 1200,
              }}
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
