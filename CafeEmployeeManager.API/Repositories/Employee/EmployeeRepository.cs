using CafeEmployeeManager.API.Model;
using static Org.BouncyCastle.Math.EC.ECCurve;
using System.Data;
using CafeEmployeeManager.API.Data;
using MySqlConnector;
using Dapper;
using CafeEmployeeManager.API.Model.Request_Body;

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

        public async Task<int> AddAsync(EmployeeRequestBody request)
        {

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("employee_i_sp", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Add parameters to the command
                    command.Parameters.AddWithValue("p_name", request.Name);
                    command.Parameters.AddWithValue("p_email_address", request.EmailAddress);
                    command.Parameters.AddWithValue("p_phone_number", request.PhoneNumber);
                    command.Parameters.AddWithValue("p_gender", request.Gender);


                    // Execute the stored procedure
                    var result = await command.ExecuteNonQueryAsync();
                    return result;
                }
            }

        }

        public Task<int> AddAsync(Employee entity)
        {
            throw new NotImplementedException();
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
                    parameters.Add("p_start_date", request.StartDate, DbType.Date, ParameterDirection.Input);

                    var result = await connection.QuerySingleAsync<dynamic>("add_employee_with_cafe", parameters, commandType: CommandType.StoredProcedure);

                    int result_code = (int)result.result_code;
                    string result_message = result.Message;

                    return (result_code, result_message);
                }
            }
            catch (MySqlException ex)
            {
                return (-2,ex.Message);
            }
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Employee>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Employee> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Employee entity)
        {
            throw new NotImplementedException();
        }

        public Task<(int, string)> UpdateEmployeeWithCafeRelationship(Employee entity)
        {
            throw new NotImplementedException();
        }
    }
}
