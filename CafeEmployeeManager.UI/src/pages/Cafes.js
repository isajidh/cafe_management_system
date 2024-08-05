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
import styles from "./Cafes.module.css";

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

  const columnDefs = [
    {
      headerName: "Logo",
      field: "logo",
      cellRenderer: (params) => (
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/logo/${params.value}`}
          alt="Logo"
          className={styles.cafeImage}
        />
      ),
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
        <div className={styles.buttonContainer}>
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
        </div>
      ),
    },
  ];

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

  const handleEditCafe = (cafe) => {
    setSelectedCafe(cafe);
    setModalEditOpen(true);
  };

  const handleDeleteCafe = (cafe) => {
    setSelectedCafe(cafe);
    setModalDeleteOpen(true);
  };

  useEffect(() => {
    dispatch(fetchCafes(location));
  }, [location, dispatch]);

  return (
    <Container className={styles.tableContainer}>
      <Typography variant="h4" gutterBottom>
        Cafes
      </Typography>
      <TextField
        label="Filter by Location"
        variant="outlined"
        className={styles.filterBy}
        value={location}
        onChange={handleLocationChange}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.addCafeButton}
        onClick={() => {
          setModalAddOpen(true);
        }}
      >
        Add New Cafe
      </Button>
      <div className={`${styles.tableStyle} ag-theme-alpine`}>
        <AgGridReact
          rowData={cafes}
          columnDefs={columnDefs}
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
