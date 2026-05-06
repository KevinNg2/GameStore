const BASE_URL = 'http://localhost:5065';

export async function getGames() {
  const res = await fetch(`${BASE_URL}/games`);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

export async function getGame(id) {
  const res = await fetch(`${BASE_URL}/games/${id}`);
  if (!res.ok) throw new Error('Failed to fetch game');
  return res.json();
}

export async function getGenres() {
  const res = await fetch(`${BASE_URL}/genres`);
  if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
}

export async function createGame(data) {
  const res = await fetch(`${BASE_URL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json();
}

export async function updateGame(id, data) {
  const res = await fetch(`${BASE_URL}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update game');
}

export async function deleteGame(id) {
  const res = await fetch(`${BASE_URL}/games/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete game');
}
