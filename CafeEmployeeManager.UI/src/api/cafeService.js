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
};

export default cafeService;
