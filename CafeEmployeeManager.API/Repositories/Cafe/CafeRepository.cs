using CafeEmployeeManager.API.Data;
using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Model.Request_Body;
using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;
using static Dapper.SqlMapper;

namespace CafeEmployeeManager.API.Repositories
{
    public class CafeRepository : ICafeRepository
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _dbContext;
        private readonly string _connectionString;

        public CafeRepository(IConfiguration configuration, AppDbContext appDbContext)
        {
            _config = configuration;
            _dbContext = appDbContext;
            _connectionString = _config.GetConnectionString("mySqlConnectionString");
        }

        public async Task<(int, string)> AddAsync(CafeRequestBody entity)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();

                    // Add parameters
                    parameters.Add("p_name", entity.Name, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_description", entity.Description, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_logo", entity.Logo, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_location", entity.Location, DbType.String, ParameterDirection.Input);

                    // Execute the command
                    var result = await connection.QuerySingleAsync<dynamic>("add_cafe_sp", parameters, commandType: CommandType.StoredProcedure);

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

        public Task<int> AddAsync(Cafe entity)
        {
            throw new NotImplementedException();
        }

        public async Task<(int,string)> DeleteAsync(string id)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();

                    // Add parameters
                    parameters.Add("p_cafe_id", id, DbType.String, ParameterDirection.Input);

                    // Execute the command
                    var result = await connection.QuerySingleAsync<dynamic>("delete_cafe_and_employees_sp", parameters, commandType: CommandType.StoredProcedure);

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

        public Task<IEnumerable<Cafe>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Cafe> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CafeEmployee>> GetCafesAsync(string location)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("loc", location, DbType.String, ParameterDirection.Input);

                var cafes = await connection.QueryAsync<CafeEmployee>(
                    "get_cafes_sp",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return cafes;
            }
        }

        public async Task<(int,string)> UpdateAsync(Cafe entity)
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    var parameters = new DynamicParameters();

                    // Add parameters
                    parameters.Add("p_id", entity.Id, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_name", entity.Name, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_description", entity.Description, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_logo", entity.Logo, DbType.String, ParameterDirection.Input);
                    parameters.Add("p_location", entity.Location, DbType.String, ParameterDirection.Input);

                    // Execute the command
                    var result = await connection.QuerySingleAsync<dynamic>("update_cafe_sp", parameters, commandType: CommandType.StoredProcedure);

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

        Task<int> IRepository<Cafe>.DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepository<Cafe>.UpdateAsync(Cafe entity)
        {
            throw new NotImplementedException();
        }
    }
}
