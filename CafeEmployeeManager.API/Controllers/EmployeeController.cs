using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CafeEmployeeManager.API.Data;
using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Repositories;
using CafeEmployeeManager.API.Model.Request_Body;

namespace CafeEmployeeManager.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IConfiguration config,  IEmployeeRepository employeeRepository, ILogger<EmployeeController> logger)
        {
            _employeeRepository = employeeRepository;
            _logger = logger;
            _config = config;
        }

        // GET api/employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            return Ok();
        }

        // GET api/employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            //return await _dbContext.Employees.FindAsync(id);
            return Ok();
        }

        [HttpPost("createEmployee")]
        public async Task<IActionResult> CreateEmployee([FromBody] EmployeeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _employeeRepository.AddAsync(request);

            return Ok(result);
        }

        [HttpPost]
        //4
        public async Task<IActionResult> AddEmployeeWithCafe([FromBody] EmployeeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            (int resultCode, string result_message) = await _employeeRepository.AddEmployeeWithCafeRelationship(request);

            if (resultCode == 0)
            {
                return Ok(result_message);
            }else
            {
                return BadRequest(new { Error = result_message });
            }
        }

        // PUT api/employee/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> UpdateEmployee(string id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            //_dbContext.Entry(employee).State = EntityState.Modified;
            //await _dbContext.SaveChangesAsync();
            return Ok(employee);
        }


        // PUT api/employee/
        [HttpPut("UpdateEmployeeWithCafe")]
        public async Task<ActionResult<Employee>> UpdateEmployeeWithCafeRelationship(EmployeeCafeRequestBody request)
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

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

        // DELETE api/employee/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            //var employee = await _dbContext.Employees.FindAsync(id);
            //if (employee == null)
            //{
            //    return NotFound();
            //}

            //_dbContext.Employees.Remove(employee);
            //await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}