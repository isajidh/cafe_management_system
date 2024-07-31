using CafeEmployeeManager.API.Model;

namespace CafeEmployeeManager.API.Repositories.Services
{
    public class CafeService : ICafeService
    {
        private readonly ICafeRepository _cafeRepository;

        public CafeService(ICafeRepository cafeRepository)
        {
            _cafeRepository = cafeRepository;
        }
        public async Task<IEnumerable<Cafe>> GetCafesAsync(string location)
        {
            return await _cafeRepository.GetCafesAsync(location);
        }
    }
}
