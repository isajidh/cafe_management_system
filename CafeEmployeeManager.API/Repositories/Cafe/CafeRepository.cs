
using CafeEmployeeManager.API.Data;
using CafeEmployeeManager.API.Model;
using Dapper;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Data;

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

        public Task<int> AddAsync(Cafe entity)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Cafe>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Cafe> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Cafe>> GetCafesAsync(string location)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("loc", location, DbType.String, ParameterDirection.Input);

                var cafes = await connection.QueryAsync<Cafe>(
                    "get_cafes_sp",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return cafes;
            }
        }

        public Task<int> UpdateAsync(Cafe entity)
        {
            throw new NotImplementedException();
        }
    }
}
