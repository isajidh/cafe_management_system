using CafeEmployeeManager.API.Repositories.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CafeEmployeeManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CafesController : ControllerBase
    {
        private readonly ICafeService _cafeService;

        public CafesController(ICafeService cafeService)
        {
            _cafeService = cafeService;
        }

        [HttpGet("getCafes")]
        public async Task<IActionResult> GetCafes([FromQuery] string location = null)
        {
            var cafes = await _cafeService.GetCafesAsync(location);
            return Ok(cafes);
        }
    }
}
