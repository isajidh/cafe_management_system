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

const Cafes = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.items);
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

  const handleAddCafe = (newCafe) => {
    // Add logic for adding a new cafe
    console.log("New Café details: ", newCafe);
  };

  const columns = [
    {
      headerName: "Logo",
      field: "logo",
      cellRenderer: (params) => <img src={params.value} alt="Logo" />,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
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
            onClick={() => handleDelete(params.value)}
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
    // Add logic for editing a cafe
    console.log("Edit button clicked", cafe);
  };

  const handleDelete = (id) => {
    // Add logic for deleting a cafe
    console.log("Delete button clicked", id);
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
      <AddCafeModal
        open={modalAddOpen}
        onClose={() => setModalAddOpen(false)}
        onSubmit={handleAddCafe}
      />
      <EditCafeModal
        open={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        onSubmit={handleEditCafe}
        cafe={selectedCafe}
      />
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact
          rowData={cafes}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true }}
          onCellClicked={(event) => {
            if (event.colDef.field === "employees") {
              handleEmployeesClick(event.data.id);
            }
          }}
        />
      </div>
    </Container>
  );
};

export default Cafes;
