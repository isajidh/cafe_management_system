import axios from "axios";

const API_URL = "https://localhost:7092/api/Cafes";

const cafeService = {
  getCafes: async (location) => {
    const response = await axios.get(`${API_URL}`, {
      params: { location },
    });
    return response.data;
  },
  createCafe: async (cafe) => {
    const response = await axios.post(`${API_URL}`, cafe);
    return response.data;
  },
  updateCafe: async (cafe) => {
    const response = await axios.put(`${API_URL}`, cafe);
    return response.data;
  },
  deleteCafe: async (id) => {
    const response = await axios.delete(`${API_URL}`, {
      params: { id },
    });
    return response.data;
  },
};

export default cafeService;
