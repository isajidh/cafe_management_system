import axios from "axios";

const API_URL = "https://localhost:7092/api/Employee";

const employeeService = {
  getAllEmployeesWithCafe: async (cafe) => {
    const response = await axios.get(`${API_URL}/GetAllEmployeesWithCafe`, {
      params: { cafe },
    });
    return response.data;
  },
  createEmployee: async (employee) => {
    const response = await axios.post(`${API_URL}`, employee);
    return response.data;
  },
  updateEmployee: async (employee) => {
    const response = await axios.put(
      `${API_URL}/UpdateEmployeeWithCafe`,
      employee
    );
    return response.data;
  },
  deleteEmployee: async (id) => {
    const response = await axios.delete(`${API_URL}`, {
      params: { id },
    });
    return response.data;
  },
};

export default employeeService;
