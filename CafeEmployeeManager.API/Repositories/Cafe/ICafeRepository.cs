using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Model.Request_Body;

namespace CafeEmployeeManager.API.Repositories
{
    public interface ICafeRepository
    {
        Task<(int, string)> AddAsync(CafeRequestBody entity);
        Task<IEnumerable<CafeEmployee>> GetCafesAsync(string location = null);
        Task<(int, string)> UpdateAsync(Cafe entity);
        Task<(int, string)> DeleteAsync(string id);
    }
}
