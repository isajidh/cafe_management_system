import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesWithCafe } from "../redux/actions/employeeActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Container, Typography } from "@material-ui/core";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import { useCafe } from "../components/CafeContext";
import EditEmployeeModal from "../components/Employee/EditEmployeeModal";

const Employees = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmploye] = useState(null);
  const { cafeID } = useCafe();
  const gridRef = useRef(null);

  const columns = [
    {
      headerName: "Employee ID",
      field: "employeeId",
      autoSize: true,
      flex: 1,
    },
    { headerName: "Name", field: "employeeName", autoSize: true, flex: 1 },
    { headerName: "Email", field: "emailAddress", autoSize: true, flex: 1 },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
      autoSize: true,
      flex: 1,
    },
    { headerName: "Days Worked", field: "daysWorked", autoSize: true, flex: 1 },
    { headerName: "Café Name", field: "cafeName", autoSize: true, flex: 1 },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.data.id)}
          >
            Delete
          </Button>
        </div>
      ),
      autoSize: true,
      flex: 1,
    },
  ];

  const handleEdit = (employee) => {
    setSelectedEmploye(employee);
    setShowEditModal(true);
  };

  const handleDelete = (employeeId) => {
    // Implement delete functionality
  };

  useEffect(() => {
    if (gridRef.current && gridRef.current.columnApi) {
      gridRef.current.columnApi.autoSizeAllColumns();
    }
  }, [employees]);

  useEffect(() => {
    if (cafeID) {
      dispatch(fetchEmployeesWithCafe(cafeID));
    }
  }, [cafeID, dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowAddModal(true)}
      >
        Add New Employee
      </Button>
      <AddEmployeeModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <div
        className="ag-theme-alpine"
        style={{ height: 400, width: "100%", marginTop: "20px" }}
      >
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          ref={gridRef}
          onGridReady={() => {
            gridRef.current.api.sizeColumnsToFit();
          }}
        />
      </div>
      <EditEmployeeModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        selectedEmployee={selectedEmployee}
        onSubmit={handleEdit}
      />
    </Container>
  );
};

export default Employees;
