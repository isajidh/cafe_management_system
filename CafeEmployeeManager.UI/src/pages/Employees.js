import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEmployees } from "../redux/actions/employeeActions";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container, Typography } from "@material-ui/core";

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.items);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cafeId = params.get("cafeId");

  useEffect(() => {
    if (cafeId) {
      dispatch(fetchEmployees(cafeId));
    }
  }, [cafeId, dispatch]);

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "emailAddress" },
    { headerName: "Phone", field: "phoneNumber" },
    { headerName: "Gender", field: "gender" },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employees
      </Typography>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={employees}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>
    </Container>
  );
};

export default Employees;
