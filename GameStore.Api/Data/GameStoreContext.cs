using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options) 
    : DbContext(options)
{   
    // The DbSet properties are used to query and save instances of the entities. They are not required, but they make it easier to work with the entities.
    public DbSet<Game> Games => Set<Game>();
    // The Genres DbSet is not used in the application, but it is included here for completeness. It can be used to query and save instances of the Genre entity.
    public DbSet<Genre> Genres => Set<Genre>();
}




// This file is required to be able to run the migrations, but it is not used in the application. The application uses the constructor with 
// DbContextOptions<GameStoreContext> parameter.