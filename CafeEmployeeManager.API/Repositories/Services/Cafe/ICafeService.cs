using CafeEmployeeManager.API.Model;

namespace CafeEmployeeManager.API.Repositories.Services
{
    public interface ICafeService
    {
        Task<IEnumerable<Cafe>> GetCafesAsync(string location);

    }
}
