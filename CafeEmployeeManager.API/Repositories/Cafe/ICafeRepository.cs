using CafeEmployeeManager.API.Model;

namespace CafeEmployeeManager.API.Repositories
{
    public interface ICafeRepository : IRepository<Cafe>
    {
        Task<IEnumerable<Cafe>> GetCafesAsync(string location = null);
    }
}
