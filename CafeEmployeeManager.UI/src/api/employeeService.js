import axios from "axios";

const API_URL = "https://localhost:7092/api/Employee";

const employeeService = {
  getAllEmployeesWithCafe: async (cafe) => {
    const response = await axios.get(`${API_URL}/GetAllEmployeesWithCafe`, {
      params: { cafe },
    });
    return response.data;
  },
  createEmployee: async (cafe) => {
    const response = await axios.post(`${API_URL}/CreateCafe`, cafe);
    return response.data;
  },
};

export default employeeService;
