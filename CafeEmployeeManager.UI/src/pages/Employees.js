import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeesWithCafe } from "../redux/actions/employeeActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button } from "@material-ui/core";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import { useCafe } from "../components/CafeContext";

const Employees = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const { cafeID, setCafeID } = useCafe();

  useEffect(() => {
    if (cafeID) {
      dispatch(fetchEmployeesWithCafe(cafeID));
    } else {
      dispatch(fetchEmployeesWithCafe(""));
    }
  }, [cafeID, setCafeID, dispatch]);

  const columns = [
    { headerName: "Employee ID", field: "employeeId" },
    { headerName: "Name", field: "employeeName" },
    { headerName: "Email", field: "emailAddress" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Café Name", field: "cafeName" },
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
    },
  ];

  const handleEdit = (employee) => {
    // Implement edit functionality
  };

  const handleDelete = (employeeId) => {
    // Implement delete functionality
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <h2>Employees</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Add New Employee
      </Button>
      <AgGridReact
        rowData={employees}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
      />
      <AddEmployeeModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Employees;
