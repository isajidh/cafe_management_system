import axios from "axios";

const API_URL = "https://localhost:7092/api/Employee";

const employeeService = {
  getAllEmployeesWithCafe: async (cafeId) => {
    const response = await axios.get(`${API_URL}/GetAllEmployeesWithCafe`, {
      params: { cafeId },
    });
    return response.data;
  },
  createEmployee: async (employee) => {
    const response = await axios.post(`${API_URL}`, employee);
    return response.data;
  },
};

export default employeeService;
