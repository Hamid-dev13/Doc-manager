export default function DocCard({ card, index, onDelete }) {
  const handleDelete = async () => {
    if (!confirm(`Supprimer "${card.title}" ?`)) return;
    try {
      await onDelete(card.id);
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="card">
      <span className="card-index">#{String(index).padStart(2, '0')}</span>
      <button
        className="card-delete"
        onClick={handleDelete}
        title="Supprimer"
        aria-label="Supprimer la card"
      >
        ×
      </button>
      <div className="card-body">
        <div className="card-name">{card.title}</div>
        {card.description && (
          <div className="card-description">{card.description}</div>
        )}
        <div className="pricing" style={{ marginTop: card.description ? 'auto' : '16px' }}>
          <div className="price-row">
            <span className="price-label">Prix estimé</span>
            <span className="price-value">{Number(card.price).toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
}
