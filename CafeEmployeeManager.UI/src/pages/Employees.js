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
import DeleteEmployeeModal from "../components/Employee/DeleteEmployeeModal";
import styles from "./Employees.module.css";

const Employees = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmploye] = useState(null);
  const { cafeID } = useCafe();
  const gridRef = useRef(null);

  const columns = [
    {
      headerName: "Employee ID",
      field: "employeeId",
    },
    { headerName: "Name", field: "employeeName" },
    { headerName: "Email", field: "emailAddress" },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
    },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Café Name", field: "cafeName" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className={styles.buttonContainer}>
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
            onClick={() => handleDelete(params.data)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (employee) => {
    setSelectedEmploye(employee);
    setShowEditModal(true);
  };

  const handleDelete = (employee) => {
    setSelectedEmploye(employee);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (gridRef.current && gridRef.current.columnApi) {
      gridRef.current.columnApi.autoSizeAllColumns();
    }
  }, [employees]);

  useEffect(() => {
    dispatch(fetchEmployeesWithCafe(cafeID));
  }, [cafeID, dispatch]);

  return (
    <Container className={styles.tableContainer}>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={styles.addEmployeeButton}
        onClick={() => setShowAddModal(true)}
      >
        Add New Employee
      </Button>
      <div className={`${styles.tableStyle} ag-theme-alpine`}>
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
          defaultColDef={{ sortable: true }}
          domLayout="autoHeight"
          ref={gridRef}
          onGridReady={() => {
            gridRef.current.api.sizeColumnsToFit();
          }}
        />
      </div>
      <AddEmployeeModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {selectedEmployee && showEditModal && (
        <EditEmployeeModal
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          selectedEmployee={selectedEmployee}
        />
      )}

      {selectedEmployee && showDeleteModal && (
        <DeleteEmployeeModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          employee={selectedEmployee}
        />
      )}
    </Container>
  );
};

export default Employees;
