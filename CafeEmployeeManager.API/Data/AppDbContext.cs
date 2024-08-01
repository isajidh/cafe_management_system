using Microsoft.EntityFrameworkCore;
using CafeEmployeeManager.API.Model;

namespace CafeEmployeeManager.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSet properties for your entities
        public DbSet<Employee> Employees { get; set; }

    }
}
