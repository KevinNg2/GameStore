import './GamesTable.css';

function GamesTable({ games, onEdit, onDelete }) {
  if (games.length === 0) {
    return (
      <div className="empty-state">
        No games in the store yet. Click <strong>+ Add Game</strong> to get started.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="games-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Price</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td className="col-id">{game.id}</td>
              <td className="col-name">{game.name}</td>
              <td className="col-genre">
                <span className="genre-badge">{game.genre}</span>
              </td>
              <td className="col-price">${Number(game.price).toFixed(2)}</td>
              <td className="col-date">{game.releaseDate}</td>
              <td className="col-actions">
                <button className="btn btn-edit" onClick={() => onEdit(game.id)}>
                  Edit
                </button>
                <button className="btn btn-delete" onClick={() => onDelete(game.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GamesTable;
