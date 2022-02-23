import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import { useState } from "react";
import SnackbarSuccess from "../SnackbarSuccess/SnackbarSuccess";
import SnackbarError from "../SnackbarError/SnackbarError";

const { REACT_APP_BACKEND_API } = process.env;

export default function AdminProductsGrid({ productsData, getAllProducts }) {
  const navigate = useNavigate();
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
    console.log(`Borrando producto con id: ${id}`);
    try {
      const response = await axios.delete(
        `${REACT_APP_BACKEND_API}products/${id}`,
        config
      );
      setBackendResponse(response.data.message);
      setOpen(true);
      getAllProducts();
    } catch (error) {
      setError(error.response.data.error);
      setOpenError(true);
    }
  };

  const handleNavigateClick = (id) => (event) => {
    event.stopPropagation();
    console.log(`Redirigiendo a ficha del producto:${id}`);
    navigate(`/products/${id}`);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 60 },
    { field: "title", headerName: "Producto", width: 130 },
    { field: "price", headerName: "Precio (€)", width: 180 },
    { field: "location", headerName: "Localidad", width: 100 },
    { field: "state", headerName: "Estado", width: 150 },
    { field: "createdAt", headerName: "Fecha de subida", width: 180 },
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const rows = [];

  if (productsData) {
    productsData.map((product) => {
      const { idProduct, title, price, location, state, createdAt } = product;
      const productObject = {
        id: idProduct,
        title: title,
        price: price,
        location: location,
        state: state,
        createdAt: createdAt,
      };
      rows.push(productObject);
      return true;
    });
  }

  return (
    <>
      {productsData && (
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
