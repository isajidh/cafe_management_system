import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { updateEmployeeRequest } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { Typography } from "@material-ui/core";
import MyTextBox from "../common/MyTextBox";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

const EditEmployeeModal = ({ open, onClose, selectedEmployee }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.items);
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "",
    cafeId: "",
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        employeeId: selectedEmployee.employeeId,
        name: selectedEmployee.employeeName,
        emailAddress: selectedEmployee.emailAddress,
        phoneNumber: selectedEmployee.phoneNumber,
        gender: selectedEmployee.gender,
        cafeId: selectedEmployee.cafeId,
      });
    }
    return setUnsavedChanges(false);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate phone number
    if (name === "phoneNumber") {
      const phoneNumberPattern = /^[89]\d{7}$/;
      if (!phoneNumberPattern.test(value)) {
        setValidationMessage(
          "Phone number must start with 8 or 9 and have exactly 8 digits."
        );
      } else {
        setValidationMessage("");
      }
    }

    setFormData({ ...formData, [name]: value });
    setUnsavedChanges(true);
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployeeRequest(formData));
    setUnsavedChanges(false);
    onClose();
  };

  const handleClose = () => {
    // Check if there are unsaved changes
    if (unsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose} className={classes.modal}>
      <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle }}>
        <div>
          <Typography variant="h6" id="simple-modal-title">
            Edit Café
          </Typography>
          <MyTextBox
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            error={
              formData.name !== "" &&
              (formData.name.length < 6 || formData.name.length > 10)
            }
            helperText="Name must be between 6 and 10 characters."
            inputProps={{ minLength: 6, maxLength: 10 }}
            required
          />
          <MyTextBox
            label="Email"
            name="email"
            type="email"
            value={formData.emailAddress || ""}
            onChange={handleChange}
            required
          />
          <MyTextBox
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            inputProps={{ pattern: "[89][0-9]{7}", maxLength: 8 }}
            error={!!validationMessage}
            helperText={validationMessage}
          />
          <FormControl component="fieldset" className={classes.formField}>
            <RadioGroup
              name="gender"
              value={formData.gender || ""}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="normal" className={classes.formField}>
            <InputLabel id="cafe-select-label">Assigned Café</InputLabel>
            <Select
              labelId="cafe-select-label"
              name="cafeId"
              value={formData.cafeId || ""}
              onChange={handleChange}
              fullWidth
              required
            >
              {Array.isArray(cafes) ? (
                cafes.map((cafe) => (
                  <MenuItem key={cafe.id} value={cafe.id}>
                    {cafe.name}
                  </MenuItem>
                ))
              ) : (
                <p>No cafés available.</p>
              )}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              sx={{ flex: 1, mr: 1 }}
            >
              Save
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              sx={{ flex: 1, ml: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </div>
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

export default EditEmployeeModal;
