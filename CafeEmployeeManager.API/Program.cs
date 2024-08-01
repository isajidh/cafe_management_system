using Microsoft.EntityFrameworkCore;
using CafeEmployeeManager.API.Data;
using CafeEmployeeManager.API.Repositories;
using Microsoft.Extensions.Logging;
using Serilog;
using Microsoft.Extensions.Configuration;


var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(config).CreateLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    //Register SeriLog
    builder.Logging.ClearProviders();
    builder.Logging.AddSerilog();

    // Register SQL database connection
    // var connectionString = builder.Configuration.GetConnectionString("ConnectionString");
    // builder.Services.AddDbContext<AppDbContext>(options =>
    //     options.UseSqlServer(connectionString));

    // Register MYSQL database connection
    var mySqlConnectionString = builder.Configuration.GetConnectionString("MySQLConnectionString");
    builder.Services.AddDbContext<AppDbContext>(options =>
           options.UseMySql(mySqlConnectionString, ServerVersion.AutoDetect(mySqlConnectionString)));

    // Register repository
    builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
    builder.Services.AddScoped<ICafeRepository, CafeRepository>();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.UseRouting();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Failed to start");
}
finally
{
    Log.CloseAndFlush();
}