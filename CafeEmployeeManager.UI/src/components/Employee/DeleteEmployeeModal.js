import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteEmployeeRequest } from "../../redux/actions/employeeActions";

const DeleteEmployeeModal = ({ open, onClose, employee }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteEmployeeRequest(employee?.employeeId));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the employee {employee?.employeeName}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployeeModal;
