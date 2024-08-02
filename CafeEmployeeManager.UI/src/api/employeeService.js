import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getEmployees = async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
};

export default {
  getEmployees,
};
