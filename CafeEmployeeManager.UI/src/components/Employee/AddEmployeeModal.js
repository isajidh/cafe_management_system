import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Box, Modal, TextField, Button } from "@material-ui/core";
import { addEmployee } from "../../redux/actions/employeeActions";

const AddEmployeeModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [employee, setEmployee] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "",
    cafeId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle }}>
        <h2>Add New Employee</h2>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="emailAddress"
          value={employee.emailAddress}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={employee.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gender"
          name="gender"
          value={employee.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Café ID"
          name="cafeId"
          value={employee.cafeId}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default AddEmployeeModal;
