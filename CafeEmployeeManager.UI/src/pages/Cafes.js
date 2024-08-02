import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { fetchCafes } from "../redux/actions/cafeActions";
import { Container, Typography } from "@material-ui/core";

const Cafes = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.items);
  const [location, setLocation] = useState("");

  useEffect(() => {
    dispatch(fetchCafes(location));
    console.log("cafes for you", cafes);
  }, [location, dispatch, cafes]);

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Employees",
      field: "employees",
      filter: "agNumberColumnFilter",
    },
    { headerName: "Location", field: "location" },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cafes
      </Typography>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={cafes}
          columnDefs={columns}
          defaultColDef={{ sortable: true, filter: true }}
        />
      </div>
    </Container>
  );
};

export default Cafes;
