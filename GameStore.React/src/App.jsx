import { useState, useEffect, useCallback } from 'react';
import GamesTable from './components/GamesTable';
import GameForm from './components/GameForm';
import { getGames, getGenres, getGame, createGame, updateGame, deleteGame } from './api/gamesApi';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [gamesData, genresData] = await Promise.all([getGames(), getGenres()]);
      setGames(gamesData);
      setGenres(genresData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleEdit(id) {
    try {
      const game = await getGame(id);
      setEditingGame(game);
      setShowForm(true);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this game?')) return;
    try {
      await deleteGame(id);
      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSave(formData) {
    try {
      if (editingGame) {
        await updateGame(editingGame.id, formData);
      } else {
        await createGame(formData);
      }
      setShowForm(false);
      setEditingGame(null);
      await loadData();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function handleAddNew() {
    setEditingGame(null);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditingGame(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-logo">🎮</span>
          <h1>Game Store</h1>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}>
          + Add Game
        </button>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss">&times;</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Loading games…</span>
          </div>
        ) : (
          <GamesTable games={games} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

      {showForm && (
        <GameForm
          game={editingGame}
          genres={genres}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
