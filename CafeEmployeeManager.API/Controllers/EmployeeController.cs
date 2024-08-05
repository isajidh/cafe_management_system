using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CafeEmployeeManager.API.Data;
using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Repositories;
using CafeEmployeeManager.API.Model.Request_Body;
using static Google.Protobuf.Reflection.SourceCodeInfo.Types;

namespace CafeEmployeeManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IConfiguration config,  IEmployeeRepository employeeRepository, ILogger<EmployeeController> logger)
        {
            _employeeRepository = employeeRepository;
            _logger = logger;
        }

        // GET api/getAllEmployees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var cafes = await _employeeRepository.GetAllEmployeesAsync();
                return Ok(cafes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in getting all employees");
                return StatusCode(500, ex.Message);
            }
        }

        // GET api/getEmployeesWithCafe
        [HttpGet("GetAllEmployeesWithCafe")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployeesWithCafe([FromQuery] string cafe = null)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var cafes = await _employeeRepository.GetEmployeesByCafeAsync(cafe);
                return Ok(cafes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in getting employees with cafe");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("createEmployeeOnly")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _employeeRepository.AddAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in creating employee");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        //4
        public async Task<IActionResult> AddEmployeeWithCafe([FromBody] EmployeeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                (int resultCode, string result_message) = await _employeeRepository.AddEmployeeWithCafeRelationship(request);

                if (resultCode == 0)
                {
                    return Ok(result_message);
                }
                else
                {
                    return BadRequest(new { Error = result_message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in creating employee with cafe");
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/employee/
        [HttpPut]
        public async Task<ActionResult<Employee>> UpdateEmployeeWithCafeRelationship(EmployeeCafeRequestBody request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                (int resultCode, string result_message) = await _employeeRepository.UpdateEmployeeWithCafeRelationship(request);

                if (resultCode == 0)
                {
                    return Ok(result_message);
                }
                else
                {
                    return BadRequest(new { Error = result_message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in updating employee with cafe");
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/employee/5
        [HttpDelete]
        public async Task<ActionResult> DeleteEmployee([FromQuery] string id)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            try
            {
                (int resultCode, string result_message) = await _employeeRepository.DeleteAsync(id);

                if (resultCode == 0)
                {
                    return Ok(result_message);
                }
                else
                {
                    return BadRequest(new { Error = result_message });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in deleting the customer");
                return StatusCode(500, ex.Message);
            }
        }
    }
}