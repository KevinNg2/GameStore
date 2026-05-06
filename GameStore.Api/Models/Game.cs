namespace GameStore.Api.Models;

public class Game
{
    public int Id { get; set; }
    public required string? Name { get; set; }

    public Genre? Genre { get; set; }

    public int GenreId { get; set; }

    public decimal Price { get; set; }

    public DateOnly ReleaseDate { get; set; }
  
}


// This class is a model class that represents a game in the Game Store API. It has properties for the game's ID, name, genre, price, and release date. 
// The Genre property is a navigation property that allows us to access the genre of the game directly from the game object. 
// The GenreId property is a foreign key that links the game to its genre in the database.