using CafeEmployeeManager.API.Model;
using CafeEmployeeManager.API.Model.Request_Body;

namespace CafeEmployeeManager.API.Repositories
{
    public interface IEmployeeRepository : IRepository<Employee>
    {
        Task<int> AddAsync(EmployeeRequestBody request);
        Task<(int, string)> AddEmployeeWithCafeRelationship(EmployeeRequestBody request);
        Task<(int, string)> UpdateEmployeeWithCafeRelationship(EmployeeCafeRequestBody entity);
        Task<(int, string)> DeleteAsync(string id);
        Task<IEnumerable<EmployeeCafe>> GetEmployeesByCafeAsync(string cafeId);
        Task<IEnumerable<EmployeeCafe>> GetAllEmployeesAsync();
    }

}
