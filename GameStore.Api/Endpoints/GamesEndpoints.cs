using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints;

//contains all API endpoints related to games, such as retrieving, creating, updating, and deleting games. 
// This class serves as a central location for defining the routes and handlers for game-related operations in the API.
public static class GamesEndpoints
{

    const string GetGameEndpointName = "GetGames"; // Define a constant for the endpoint name

    public static void MapgamesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/games");

        // GET /games
        group.MapGet("/", async (GameStoreContext dbContext) 
            => await dbContext.Games
                              .Include(game => game.Genre)
                              .Select(game => new GameSummaryDto(
                                game.Id,
                                game.Name,
                                game.Genre!.Name,
                                game.Price,
                                game.ReleaseDate                                
                            ))
                            .AsNoTracking()
                            .ToListAsync()); 

        // GET /games/1
        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound() : Results.Ok(
                new GameDetailsDto(
                    game.Id,
                    game.Name,
                    game.GenreId,
                    game.Price,
                    game.ReleaseDate
                )
            );
        })
            .WithName(GetGameEndpointName); // handler for GET /games/{id} with a route parameter for the game id, and assign the endpoint name

        // POST /games
        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
        {
            Game game = new()
            {
                Name = newGame.Name,
                GenreId = newGame.GenreId,
                Price = newGame.Price,
                ReleaseDate = newGame.ReleaseDate
            };


            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            GameDetailsDto gameDto = new(
                game.Id,
                game.Name,
                game.GenreId,
                game.Price,
                game.ReleaseDate
            );

            return Results.CreatedAtRoute(GetGameEndpointName, new { id = gameDto.Id }, gameDto); // Return a 201 Created response with the location of the newly created game
        });

        // PUT /games/1
        group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext dbContext) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            if (existingGame is null)
            {
                return Results.NotFound();
            }

            existingGame.Name = updatedGame.Name;
            existingGame.GenreId = updatedGame.GenreId;
            existingGame.Price = updatedGame.Price;
            existingGame.ReleaseDate = updatedGame.ReleaseDate;

            await dbContext.SaveChangesAsync();

            return Results.NoContent(); // Return a 204 No Content response to indicate the update was successful
        });

// DELETE /games/1
        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            await dbContext.Games
                           .Where(game => game.Id == id)
                           .ExecuteDeleteAsync();

            return Results.NoContent(); // Return a 204 No Content response to indicate the deletion was successful
        });
    }
}
