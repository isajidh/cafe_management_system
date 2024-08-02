import axios from "axios";

const API_URL = "https://localhost:7092/api/Cafes";

const getCafes = async (location) => {
  const response = await axios.get(`${API_URL}/GetCafes`, {
    params: { location },
  });
  return response.data;
};

export default {
  getCafes,
};
