import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Modal,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { addEmployeeRequest } from "../../redux/actions/employeeActions";
import { fetchCafes } from "../../redux/actions/cafeActions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import MyTextBox from "../common/MyTextBox";

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
        <MyTextBox
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
        <MyTextBox
          label="Email"
          name="emailAddress"
          type="email"
          value={employee.emailAddress}
          onChange={handleChange}
          margin="normal"
        />
        <MyTextBox
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={employee.phoneNumber}
          onChange={handleChange}
          inputProps={{ pattern: "[89][0-9]{7}", maxLength: 8 }}
          error={!!validationMessage}
          helperText={validationMessage}
        />

        <FormControl component="fieldset" className={classes.formField}>
          <RadioGroup
            name="gender"
            value={employee.gender || ""}
            onChange={handleChange}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
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
              maxDate={dayjs()}
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
