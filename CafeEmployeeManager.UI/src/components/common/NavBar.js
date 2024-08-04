import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useCafe } from "../CafeContext";
import { useDispatch } from "react-redux";
import { fetchEmployeesWithCafe } from "../../redux/actions/employeeActions";

const NavBar = () => {
  const { cafeID, setCafeID } = useCafe();
  const dispatch = useDispatch();
  const handleEmployeeButtonClick = () => {
    setCafeID(""); // Clear cafeID before navigating
  };

  useEffect(() => {
    dispatch(fetchEmployeesWithCafe(cafeID));
  }, [cafeID, dispatch]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Cafe Employee Manager
        </Typography>
        <Button color="inherit" component={Link} to="/cafes">
          Cafes
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
