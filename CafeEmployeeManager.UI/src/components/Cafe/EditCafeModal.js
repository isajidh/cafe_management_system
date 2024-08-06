import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { updateCafe } from "../../redux/actions/cafeActions";
import MyTextBox from "../common/MyTextBox";
import { Typography } from "@material-ui/core";
import ImageUploader from "../common/ImageUploader";

const EditCafeModal = ({ open, onClose, cafe }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    logo: null,
    location: "",
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (cafe) {
      setFormData({
        id: cafe.id,
        name: cafe.name,
        description: cafe.description,
        logo: cafe.logo,
        location: cafe.location,
      });
    }

    return setUnsavedChanges(false);
  }, [cafe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUnsavedChanges(true);
  };

  const handleImageUpload = (filename) => {
    setFormData({ ...formData, logo: filename });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCafe(formData));
    setUnsavedChanges(false);
    onClose();
  };

  const handleClose = () => {
    if (unsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to close?"
        )
      ) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle }}>
        <div>
          <Typography variant="h6" id="simple-modal-title">
            Edit Café
          </Typography>
          <MyTextBox
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formData.name.length < 6 || formData.name.length > 10}
            helperText="Name must be between 6 and 10 characters."
            inputProps={{ minLength: 6, maxLength: 10 }}
          />
          <MyTextBox
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={formData.description.length > 256}
            helperText="Description must be less than 256 characters."
            inputProps={{ maxLength: 256 }}
          />

          <ImageUploader onImageUpload={handleImageUpload} />
          <MyTextBox
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: 1, mr: 1 }}
            >
              Submit
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

export default EditCafeModal;
