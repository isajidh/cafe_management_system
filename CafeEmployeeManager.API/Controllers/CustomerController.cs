using Microsoft.AspNetCore.Mvc;
using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Repositories;

namespace CafeEmployeeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _repository;
        private readonly ILogger<CustomerController> _logger;

        public CustomerController(ICustomerRepository repository, ILogger<CustomerController> logger)
        {
            _repository = repository;
            _logger = logger;
            _logger.LogDebug("NLog is integrated to Customer Controller");
        }

        [HttpPost("addCustomer")]
        public async Task<IActionResult> AddCustomer(Customer customer)
        {
            try
            {
                var result = await _repository.AddAsync(customer);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding customer");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<Customer>>> GetAllCustomers()
        {
            try
            {
                var customers = await _repository.GetAllAsync();
                return Ok(customers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all customers");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{customerId}")]
        public async Task<IActionResult> UpdateCustomer(int customerId, Customer customer)
        {
            try
            {
                if (customerId != customer.CustomerId)
                {
                    return BadRequest("Customer ID in the route parameter does not match the ID in the request body.");
                }

                var result = await _repository.UpdateAsync(customer);

                if (result == 0)
                {
                    return NotFound($"Customer with ID {customerId} not found.");
                }

                return NoContent(); // Return 204 No Content if the update is successful
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating customer");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{customerId}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            try
            {
                var result = await _repository.DeleteAsync(id);
                if (result > 0)
                {
                    return Ok("Customer deleted successfully.");
                }
                else
                {
                    return NotFound("Customer not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error while deleting customer: {ex.Message}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
