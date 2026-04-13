import { useState } from 'react';

export default function AddPageModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) { setError('Le titre est requis'); return; }
    setSubmitting(true);
    try {
      await onCreate({ title, description });
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Nouveau budget</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Titre</label>
            <input
              className="form-input"
              value={title}
              onChange={e => { setTitle(e.target.value); setError(''); }}
              placeholder="Ex : Matériel serveur, Déplacement client…"
              autoFocus
            />
            {error && <div className="form-error">{error}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Contexte, objectif, contraintes budgétaires…"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Création…' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
