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

    // Register MYSQL database connection
    var mySqlConnectionString = builder.Configuration.GetConnectionString("MySQLConnectionString");
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseMySql(mySqlConnectionString, ServerVersion.AutoDetect(mySqlConnectionString), 
            mySqlOptions => mySqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5, // Number of retry attempts
                maxRetryDelay: TimeSpan.FromSeconds(10), // Delay between retries
                errorNumbersToAdd: null // List of additional error numbers to retry on
            )));

    // Register repository
    builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
    builder.Services.AddScoped<ICafeRepository, CafeRepository>();

    // Add CORS services
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowSpecificOrigin",
            builder =>
            {
                builder.WithOrigins("http://localhost:3000") // Specify the client URL
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
             options.AddPolicy("AllowAllOrigins",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
        app.UseCors("AllowSpecificOrigin");
    }

    app.UseHttpsRedirection();
    app.UseRouting();

    app.UseCors("AllowAllOrigins"); // Use the CORS policy

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