using CafeEmployeeManager.API.Model.Request_Body;
using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeEmployeeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CafesController : ControllerBase
    {
        private readonly ICafeRepository _cafeRepository;
        private readonly ILogger<CafesController> _logger;

        public CafesController(ICafeRepository cafeService, ILogger<CafesController> logger)
        {
            _cafeRepository = cafeService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetCafes([FromQuery] string location = null)
        {
            try
            {
                var cafes = await _cafeRepository.GetCafesAsync(location);
                return Ok(cafes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching customers");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCafe([FromBody] CafeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                
                (int result_code, string result_message) = await _cafeRepository.AddAsync(request);

                if (result_code == 0)
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
                _logger.LogError(ex, "Error in creating customer");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCafe([FromBody] Cafe request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                (int result_code, string result_message) = await _cafeRepository.UpdateAsync(request);

                if (result_code == 0)
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
                _logger.LogError(ex, "Error in updating the cafe");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAsync([FromQuery] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                (int result_code, string result_message) = await _cafeRepository.DeleteAsync(id);

                if (result_code == 0)
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
                _logger.LogError(ex, "Error in deleting the cafe");
                return StatusCode(500, ex.Message);
            }
        }

    }
}
