using System.Data.SqlClient;
using CafeEmployeeManager.API.Model;
using System.Data;
using Dapper;
using CafeEmployeeManager.API.Data;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace CafeEmployeeManager.API.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly IConfiguration _config;
        private readonly AppDbContext _dbContext;

        public CustomerRepository(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _dbContext = context;
        }

        public async Task<int> AddAsync(Customer customer)
        {
            var connectionString = _config.GetConnectionString("mySqlConnectionString");

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();

                using (var command = new MySqlCommand("add_customer_sp", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    // Add parameters to the command
                    command.Parameters.AddWithValue("p_customerId", customer.CustomerId);
                    command.Parameters.AddWithValue("p_name", customer.Name);
                    command.Parameters.AddWithValue("p_phone", customer.Phone);
                    command.Parameters.AddWithValue("p_email", customer.Email);
                    command.Parameters.AddWithValue("p_address", customer.Address);
                    command.Parameters.AddWithValue("p_customerType", customer.CustomerType);
                    command.Parameters.AddWithValue("p_companyName", (object)customer.CompanyName ?? DBNull.Value);
                    command.Parameters.AddWithValue("p_additionalInformation", (object)customer.AdditionalInformation ?? DBNull.Value);

                    // Execute the stored procedure
                    var result = await command.ExecuteNonQueryAsync();
                    return result;
                }
            }
        }

        public async Task<int> DeleteAsync(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.FindAsync(id);
                if (customer != null)
                {
                    _dbContext.Customers.Remove(customer);
                    return await _dbContext.SaveChangesAsync();
                }
                else
                {
                    // Customer not found
                    return 0;
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while deleting customer by ID: {ex.Message}");
                // You can throw or handle the exception based on your requirement
                throw;
            }
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            var result = await _dbContext.Customers.FromSqlRaw($"EXECUTE get_all_customer_sp").ToListAsync();
            return result;
        }

        public async Task<Customer> GetByIdAsync(int id)
        {
            var result = await _dbContext.Customers.FindAsync(id);
            return result;
        }

        public async Task<int> UpdateAsync(Customer customer)
        {
            var sp = "update_customer_sp";
            var query = $"EXEC {sp} '{customer.CustomerId}', '{customer.Name}', '{customer.Phone}','{customer.Email}', '{customer.Address}', '{customer.CustomerType}', '{customer.CompanyName}', '{customer.AdditionalInformation}'";
            // Execute the stored procedure to update the customer
            var result = await _dbContext.Database.ExecuteSqlRawAsync(query);

            return result;
        }
    }

}
