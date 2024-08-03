import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Box, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createCafe } from "../../redux/actions/cafeActions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 400,
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const AddCafeModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    employees: "",
    logo: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCafe(formValues));
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Typography variant="h6" id="simple-modal-title">
          Add New Café
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.name}
            onChange={handleChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.description}
            onChange={handleChange}
            required
          />
          <TextField
            name="employees"
            label="Employees"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.employees}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            name="logo"
            label="Logo URL"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.logo}
            onChange={handleChange}
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.location}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Café
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCafeModal;
