import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function AdminGrid({ usersData }) {
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "nameUser", headerName: "Nombre", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Teléfono", width: 100 },
    { field: "createdAt", headerName: "Fecha de alta", width: 150 },
  ];

  const rows = usersData;

  return (
    <>
      {usersData && (
        <Paper style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Paper>
      )}
    </>
  );
}
