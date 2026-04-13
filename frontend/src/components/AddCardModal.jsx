import { useState } from 'react';

export default function AddCardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Le titre est requis');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onCreate({ title: title.trim(), description: description.trim(), price: parseFloat(price) || 0 });
      onClose();
    } catch (err) {
      setError(err.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-title" id="modal-title">Nouvelle ligne de coût</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="card-title">Titre *</label>
            <input
              id="card-title"
              className="form-input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex : MacBook Pro, Licence Adobe, Vol Paris…"
              autoFocus
            />
            {error && <span className="form-error">{error}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="card-desc">Description</label>
            <textarea
              id="card-desc"
              className="form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Fournisseur, justification, lien devis…"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="card-price">Prix estimé (€)</label>
            <input
              id="card-price"
              className="form-input"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Création…' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
