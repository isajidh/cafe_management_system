using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Model.Request_Body;

namespace CafeEmployeeManager.API.Repositories
{
    public interface ICafeRepository : IRepository<Cafe>
    {
        Task<(int, string)> AddAsync(CafeRequestBody entity);
        Task<IEnumerable<Cafe>> GetCafesAsync(string location = null);
    }
}
