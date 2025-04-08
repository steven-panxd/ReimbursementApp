using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReimbursementApp_Backend.Data;
using ReimbursementApp_Backend.Services;
using ReimbursementApp_Backend.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// pass expected error messages to frontend when DTO validation fails
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        // convert model errors to a list of object that reflects error fields and associated error messages
        var errors = context.ModelState.Where(model => model.Value?.Errors.Count > 0).Select(model => new {
            Field = model.Key, ErrorMessage = model.Value?.Errors.Select(e => e.ErrorMessage).ToList()
        }).ToList();

        return new BadRequestObjectResult(new
        {
            message = "Validation failed",
            errors
        });
    };
});

// inject database context
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// register services
builder.Services.AddScoped<IReimbursementService, ReimbursementService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();

app.Run();
