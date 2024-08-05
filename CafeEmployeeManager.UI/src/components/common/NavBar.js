import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useCafe } from "../CafeContext";
import { useDispatch } from "react-redux";
import { fetchAllEmployees } from "../../redux/actions/employeeActions";

const NavBar = () => {
  const { setCafeID } = useCafe();
  const dispatch = useDispatch();
  const handleEmployeeButtonClick = () => {
    setCafeID(""); // Clear cafeID
    dispatch(fetchAllEmployees());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Café Employee Manager
        </Typography>
        <Button color="inherit" component={Link} to="/cafes">
          Cafés
        </Button>
        <Button
          color="inherit"
          onClick={handleEmployeeButtonClick}
          component={Link}
          to="/employees"
        >
          Employees
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
