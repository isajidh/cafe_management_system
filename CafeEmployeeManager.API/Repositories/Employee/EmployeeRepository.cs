﻿using CafeEmployeeManager.API.Model;
using static Org.BouncyCastle.Math.EC.ECCurve;
using System.Data;
using CafeEmployeeManager.API.Data;
using MySqlConnector;
using Dapper;
using CafeEmployeeManager.API.Model.Request_Body;
using System.Threading.Tasks;


namespace CafeEmployeeManager.API.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _dbContext;
        private readonly string _connectionString;

        public EmployeeRepository(IConfiguration configuration, AppDbContext appDbContext)
        {
            _config = configuration;
            _dbContext = appDbContext;
            _connectionString = _config.GetConnectionString("mySqlConnectionString");
        }

        public async Task<(int, string)> AddEmployeeWithCafeRelationship(EmployeeRequestBody request)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();
                    parameters.Add("p_name", request.Name, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_email_address", request.EmailAddress, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_phone_number", request.PhoneNumber, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_gender", request.Gender, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_cafe_id", request.CafeId, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_start_date", request.StartDate.Date, DbType.Date, ParameterDirection.Input);

                    var result = await connection.QuerySingleAsync<dynamic>("add_employee_with_cafe_sp", parameters, commandType: CommandType.StoredProcedure);

                    int result_code = (int)result.result_code;
                    string result_message = result.result_message;

                    return (result_code, result_message);
                }
            }
            catch (MySqlException ex)
            {
                return (-2, ex.Message);
            }
        }

        public async Task<(int, string)> DeleteAsync(string id)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();
                    parameters.Add("p_employee_id", id, DbType.String, ParameterDirection.Input);

                    // Execute the stored procedure and read the output
                    var result = await connection.QueryFirstOrDefaultAsync<dynamic>("delete_employee_sp", parameters, commandType: CommandType.StoredProcedure);

                    int result_code = (int)result.result_code;
                    string result_message = result.result_message;

                    return (result_code, result_message);
                }
            }
            catch (MySqlException ex)
            {
                return (-2, ex.Message);
            }
            catch (Exception ex)
            {
                return (-1, $"Error: {ex.Message}");
            }
        }

        public async Task<(int, string)> UpdatemployeeWithCafe(EmployeeCafeRequestBody entity)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();
                    parameters.Add("p_employee_id", entity.EmployeeId, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_name", entity.Name, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_email_address", entity.EmailAddress, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_phone_number", entity.PhoneNumber, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_gender", entity.Gender, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_cafe_id", entity.CafeId, DbType.String, ParameterDirection.Input);

                    var result = await connection.QuerySingleAsync<dynamic>("update_employee_cafe_relationship_sp", parameters, commandType: CommandType.StoredProcedure);

                    int result_code = (int)result.result_code;
                    string result_message = result.result_message;

                    return (result_code, result_message);
                }
            }
            catch (MySqlException ex)
            {
                return (-2, ex.Message);
            }
        }

        public async Task<IEnumerable<EmployeeCafe>> GetEmployeesByCafeAsync(string cafeId = null)
        {
            var employees = new List<EmployeeCafe>();

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_employees_by_cafe_sp", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@cafeId", (object)cafeId ?? DBNull.Value);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var employee = new EmployeeCafe
                            {
                                EmployeeId = reader.GetString("id"),
                                EmployeeName = reader.GetString("name"),
                                Gender = reader.GetString("gender"),
                                EmailAddress = reader.GetString("emailAddress"),
                                PhoneNumber = reader.GetString("phoneNumber"),
                                CafeId = reader.GetString("cafeId"),
                                CafeName = reader.GetString("cafeName"),
                                DaysWorked = reader.GetInt32("daysWorked")
                            };
                            employees.Add(employee);
                        }
                    }
                }
            }

            return employees;
        }

        public async Task<IEnumerable<EmployeeCafe>> GetAllEmployeesAsync()
        {
            var employees = new List<EmployeeCafe>();

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("get_all_employees_sp", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var employee = new EmployeeCafe
                            {
                                EmployeeId = reader.GetString("id"),
                                EmployeeName = reader.GetString("name"),
                                Gender = reader.GetString("gender"),
                                EmailAddress = reader.GetString("emailAddress"),
                                PhoneNumber = reader.GetString("phoneNumber"),
                                CafeId = reader.IsDBNull("cafeId") ? string.Empty : reader.GetString("cafeId"),
                                CafeName = reader.IsDBNull("cafeName") ? "-" : reader.GetString("cafeName"),
                                DaysWorked = reader.IsDBNull("daysWorked") ? 0 : reader.GetInt32("daysWorked")
                            };
                            employees.Add(employee);
                        }
                    }
                }
            }

            return employees;
        }
    }
}
