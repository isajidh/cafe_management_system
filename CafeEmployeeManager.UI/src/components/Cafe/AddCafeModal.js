import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createCafe } from "../../redux/actions/cafeActions";
import MyTextBox from "../common/MyTextBox";
import ImageUploader from "../common/ImageUploader";

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
    logo: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUpload = (filename) => {
    setFormValues({ ...formValues, logo: filename });
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
          <MyTextBox
            name="name"
            label="Name"
            onChange={handleChange}
            value={formValues.name}
            error={formValues.name.length < 6 || formValues.name.length > 10}
            helperText="Name must be between 6 and 10 characters."
            inputProps={{ minLength: 6, maxLength: 10 }}
            required
          />
          <MyTextBox
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            error={formValues.description.length > 256}
            helperText="Description must be less than 256 characters."
            inputProps={{ maxLength: 256 }}
            required
          />
          {/* <TextField
            name="logo"
            label="Logo URL"
            variant="outlined"
            fullWidth
            className={classes.formField}
            value={formValues.logo}
            onChange={handleChange}
          /> */}
          <ImageUploader onImageUpload={handleImageUpload} />
          <MyTextBox
            label="Location"
            name="location"
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
