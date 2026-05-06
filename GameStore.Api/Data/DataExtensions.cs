using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public static class DataExtensions
{
    public static void MigrateDb(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider
                             .GetRequiredService<GameStoreContext>();
        dbContext.Database.Migrate();
    }

    public static void AddGameStoreDb(this WebApplicationBuilder builder)
    {

var connString = builder.Configuration.GetConnectionString("GameStore");

// DB Context has a Scoped service lifetime because:
// It ensures that a new instance of DBContext is created per request
// DB connections are a limited and expensive resource
// DBContext is not thread safe. Scoped avoids to concurrency issues
// Makes it easier to manage transactions and ensure data consistency
// Reusing a DbContext instance can lead to increased memroy usage



builder.Services.AddScoped<GameStoreContext>();
builder.Services.AddSqlite<GameStoreContext>(connString, optionsAction: options => options.UseSeeding((context, _) =>
{
    if (!context.Set<Genre>().Any())
    {
        context.Set<Genre>().AddRange(
            new Genre { Name = "Adventure" },
            new Genre { Name = "RPG" },
            new Genre { Name = "Fighting" },
            new Genre { Name = "Sports" },
            new Genre { Name = "Shooter" },
            new Genre { Name = "Racing" }
        );

        context.SaveChanges();
    }
}));
    }
}

