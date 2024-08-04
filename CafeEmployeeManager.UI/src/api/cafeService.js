import axios from "axios";

const API_URL = "https://localhost:7092/api/Cafes";

const cafeService = {
  getCafes: async (location) => {
    const response = await axios.get(`${API_URL}/GetCafes`, {
      params: { location },
    });
    return response.data;
  },
  createCafe: async (cafe) => {
    const response = await axios.post(`${API_URL}/CreateCafe`, cafe);
    return response.data;
  },
  updateCafe: async (cafe) => {
    const response = await axios.put(`${API_URL}/UpdateCafe`, cafe);
    return response.data;
  },
  deleteCafe: async (id) => {
    const response = await axios.delete(`${API_URL}/DeleteCafe`, {
      params: { id },
    });
    return response.data;
  },
};

export default cafeService;
