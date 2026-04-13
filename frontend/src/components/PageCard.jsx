export default function PageCard({ page, onClick, onDelete }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Supprimer "${page.title}" et toutes ses cards ?`)) {
      onDelete(page.id);
    }
  };

  return (
    <div className="card page-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <button className="card-delete" onClick={handleDelete} title="Supprimer la page">×</button>
      <div className="card-body">
        <div className="card-name">{page.title}</div>
        {page.description && (
          <div className="card-description page-card-desc">{page.description}</div>
        )}
        <div className="page-card-footer">
          <span className="page-card-badge">{page.card_count || 0} items</span>
        </div>
      </div>
    </div>
  );
}
