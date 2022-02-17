import * as React from "react";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const handleDeleteClick = (id) => (event) => {
  event.stopPropagation();
  console.log(`Borrando usuario con id: ${id}`);
};

const handleNavigateClick = (id) => (event) => {
  event.stopPropagation();
  console.log(`Redirigiendo a perfil del usuario: ${id}`);
};

export default function AdminGrid({ usersData }) {
  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    { field: "nameUser", headerName: "Nombre", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Teléfono", width: 100 },
    { field: "createdAt", headerName: "Fecha de alta", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
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
        <Paper style={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </Paper>
      )}
    </>
  );
}
