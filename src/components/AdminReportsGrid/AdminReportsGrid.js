import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import axios from "axios";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useState } from "react";
import SnackbarSuccess from "../SnackbarSuccess/SnackbarSuccess";
import SnackbarError from "../SnackbarError/SnackbarError";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminReportsGrid({ reportsData, getAllReports }) {
  const { userSession } = useAuthorization();
  const [backendResponse, setBackendResponse] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

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
      setOpenError(true);
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
            <SnackbarSuccess
              message={backendResponse}
              open={open}
              setOpen={setOpen}
            />
          )}
          {error && (
            <SnackbarError
              error={error}
              openError={openError}
              setOpenError={setOpenError}
            />
          )}
        </Paper>
      )}
    </>
  );
}
