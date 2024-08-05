import React, { useState } from "react";
import { Button } from "@mui/material";

const ImageUploader = ({ onImageUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      // 2MB size limit
      setError("File size should be less than 2MB");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setError("");
    onImageUpload(selectedFile.name);
  };

  return (
    <div>
      <input
        name="logo"
        label="Logo"
        accept="image/*"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button variant="outlined" component="span">
          Upload Logo
        </Button>
      </label>
      {file && <p>{file.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUploader;
