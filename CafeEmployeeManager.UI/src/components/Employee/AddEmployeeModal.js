import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Modal,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { addEmployeeRequest } from "../../redux/actions/employeeActions";
import { fetchCafes } from "../../redux/actions/cafeActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

const AddEmployeeModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes.items);
  const [location] = useState("");
  const [date] = React.useState(dayjs());
  const [validationMessage, setValidationMessage] = useState("");

  const [employee, setEmployee] = useState({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    gender: "",
    cafeId: "",
    startDate: date,
  });

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

    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (date) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      startDate: date,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationMessage) {
      dispatch(addEmployeeRequest(employee));
      onClose();
    }
  };

  useEffect(() => {
    dispatch(fetchCafes(location));
  }, [location, dispatch]);

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Box component="form" onSubmit={handleSubmit} className={classes.paper}>
        <Typography variant="h6" id="simple-modal-title">
          Add New Employee
        </Typography>
        <TextField
          label="Name"
          name="name"
          className={classes.formField}
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="emailAddress"
          type="email"
          className={classes.formField}
          value={employee.emailAddress}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          className={classes.formField}
          value={employee.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ pattern: "[89][0-9]{7}", maxLength: 8 }}
          error={!!validationMessage}
          helperText={validationMessage}
        />
        <FormControl fullWidth margin="normal" className={classes.formField}>
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Select
            labelId="gender-select-label"
            name="gender"
            value={employee.gender || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>

        <InputLabel id="cafe-select-label">Café</InputLabel>
        <Select
          labelId="cafe-select-label"
          name="cafeId"
          value={employee.cafeId || ""}
          onChange={handleChange}
          fullWidth
        >
          {Array.isArray(cafes) ? (
            cafes.map((cafe) => (
              <MenuItem key={cafe.id} value={cafe.id}>
                {cafe.name}
              </MenuItem>
            ))
          ) : (
            <p>No cafes available.</p>
          )}
        </Select>
        {/* //DatePicker */}
        <FormControl fullWidth margin="normal" className={classes.formField}>
          {" "}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              name="startDate"
              value={employee.startDate}
              onChange={(date) => handleDateChange(date)}
            />
          </LocalizationProvider>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Employee
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
