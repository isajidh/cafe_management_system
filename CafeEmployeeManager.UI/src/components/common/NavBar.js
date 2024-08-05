import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useCafe } from "../CafeContext";

const NavBar = () => {
  const { setCafeID } = useCafe();
  const handleEmployeeButtonClick = () => {
    setCafeID(""); // Clear cafeID
  };

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
