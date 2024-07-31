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
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }

        // Add other DbSet properties for your entities as needed

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure your entity mappings and relationships here
            // This method is optional and can be used to customize the database schema
            modelBuilder.Entity<Customer>().ToTable("Customers");
        }
    }
}
