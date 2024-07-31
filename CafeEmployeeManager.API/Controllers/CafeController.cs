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

        public CafesController(ICafeRepository cafeService)
        {
            _cafeRepository = cafeService;
        }

        [HttpGet("GetCafes")]
        public async Task<IActionResult> GetCafes([FromQuery] string location = null)
        {
            var cafes = await _cafeRepository.GetCafesAsync(location);
            return Ok(cafes);
        }

        [HttpPost("CreateCafe")]
        public async Task<IActionResult> CreateCafe([FromBody] CafeRequestBody request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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


    }
}
