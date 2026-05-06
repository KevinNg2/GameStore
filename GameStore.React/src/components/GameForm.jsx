import { useState } from 'react';
import './GameForm.css';

function GameForm({ game, genres, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: game?.name ?? '',
    genreId: game?.genreId ?? (genres[0]?.id ?? ''),
    price: game?.price ?? '',
    releaseDate: game?.releaseDate ?? '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    else if (formData.name.length > 50) errs.name = 'Max 50 characters';
    if (!formData.genreId) errs.genreId = 'Genre is required';
    const price = Number(formData.price);
    if (!formData.price || isNaN(price) || price < 1 || price > 100)
      errs.price = 'Price must be between $1 and $100';
    if (!formData.releaseDate) errs.releaseDate = 'Release date is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    try {
      await onSave({
        name: formData.name.trim(),
        genreId: Number(formData.genreId),
        price: Number(formData.price),
        releaseDate: formData.releaseDate,
      });
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{game ? 'Edit Game' : 'Add New Game'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter game name"
              maxLength={50}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="genreId">Genre</label>
            <select
              id="genreId"
              name="genreId"
              value={formData.genreId}
              onChange={handleChange}
            >
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.genreId && <span className="field-error">{errors.genreId}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="1 – 100"
              min={1}
              max={100}
              step="0.01"
            />
            {errors.price && <span className="field-error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="releaseDate">Release Date</label>
            <input
              id="releaseDate"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
            />
            {errors.releaseDate && <span className="field-error">{errors.releaseDate}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : game ? 'Save Changes' : 'Add Game'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GameForm;
