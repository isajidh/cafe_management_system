import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchCafes } from "../redux/actions/cafeActions";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AddCafeModal from "../components/Cafe/AddCafeModal";
import { useCafe } from "../components/CafeContext";
import EditCafeModal from "../components/Cafe/EditCafeModal";
import DeleteCafeModal from "../components/Cafe/DeleteCafeModal";

const Cafes = () => {
  const dispatch = useDispatch();
  const { cafes, loading, error } = useSelector((state) => state.cafes);
  const [location, setLocation] = useState("");
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const navigate = useNavigate();
  const { setCafeID } = useCafe();

  useEffect(() => {
    dispatch(fetchCafes(location));
  }, [location, dispatch]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleEmployeesClick = (cafeId) => {
    setCafeID(cafeId);
    navigate(`/employees`);
  };

  const handleDeleteClick = (cafe) => {
    setSelectedCafe(cafe);
    setModalDeleteOpen(true);
  };

  const columns = [
    {
      headerName: "Logo",
      field: "logo",
      cellRenderer: (params) => <img src={params.value} alt="Logo" />,
    },
    { headerName: "Name", field: "name", autoSize: true, flex: 1 },
    {
      headerName: "Description",
      field: "description",
    },
    {
      headerName: "Employees",
      field: "employees",
      cellRenderer: (params) => (
        <span class="employees-link">{params.value}</span>
      ),
    },
    {
      headerName: "Location",
      field: "location",
      filter: "agTextColumnFilter", // Adding text filter for location
      filterParams: {
        filterOptions: ["contains"], // Allows wildcard search
      },
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditCafe(params.data)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteClick(params.data)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEditCafe = (cafe) => {
    setSelectedCafe(cafe);
    setModalEditOpen(true);
  };

  const handleDeleteCafe = (cafe) => {
    setSelectedCafe(cafe);
    setModalDeleteOpen(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cafes
      </Typography>
      <TextField
        label="Filter by Location"
        variant="outlined"
        value={location}
        onChange={handleLocationChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalAddOpen(true)}
      >
        Add New Cafe
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact
          rowData={cafes?.items}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          defaultColDef={{ sortable: true }}
          onCellClicked={(event) => {
            if (event.colDef.field === "employees") {
              handleEmployeesClick(event.data.id);
            }
          }}
        />
      </div>

      <AddCafeModal
        open={modalAddOpen}
        onClose={() => setModalAddOpen(false)}
      />

      {selectedCafe && (
        <EditCafeModal
          open={modalEditOpen}
          onClose={() => setModalEditOpen(false)}
          onSubmit={handleEditCafe}
          cafe={selectedCafe}
        />
      )}
      {selectedCafe && (
        <DeleteCafeModal
          open={modalDeleteOpen}
          onClose={() => setModalDeleteOpen(false)}
          onSubmit={handleDeleteCafe}
          cafe={selectedCafe}
        />
      )}
    </Container>
  );
};

export default Cafes;
