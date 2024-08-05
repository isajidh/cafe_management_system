using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Model.Request_Body;

namespace CafeEmployeeManager.API.Repositories
{
    public interface IEmployeeRepository
    {
        Task<(int, string)> AddEmployeeWithCafeRelationship(EmployeeRequestBody request);
        Task<(int, string)> UpdatemployeeWithCafe(EmployeeCafeRequestBody entity);
        Task<IEnumerable<EmployeeCafe>> GetEmployeesByCafeAsync(string cafeId);
        Task<IEnumerable<EmployeeCafe>> GetAllEmployeesAsync();
        Task<(int, string)> DeleteAsync(string id);
    }

}
