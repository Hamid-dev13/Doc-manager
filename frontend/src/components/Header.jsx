export default function Header({ cards, onAddClick }) {
  const totalPrice = cards.reduce((sum, c) => sum + (c.price || 0), 0);

  return (
    <header>
      <div className="header-actions">
        <div>
          <div className="tag">Hardware IoT — Budget Tracker</div>
          <h1>
            Estimations du budget<br />
            <span>hardware</span>
          </h1>
          <p className="subtitle">
            Composants, capteurs et modules pour le projet Tracker IoT
          </p>
        </div>
        <button className="btn-add" onClick={onAddClick}>
          + Ajouter
        </button>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat-value">{cards.length}</span>
          <span className="stat-label">Composants</span>
        </div>
        <div className="stat">
          <span className="stat-value">{totalPrice.toFixed(2)} €</span>
          <span className="stat-label">Budget total</span>
        </div>
        <div className="stat">
          <span className="stat-value">
            {cards.length > 0 ? (totalPrice / cards.length).toFixed(2) : '0.00'} €
          </span>
          <span className="stat-label">Coût moyen</span>
        </div>
      </div>
    </header>
  );
}
