import { useState } from 'react';
import { useCards } from '../hooks/useCards.js';
import EditableText from '../components/EditableText.jsx';
import CardGrid from '../components/CardGrid.jsx';
import AddCardModal from '../components/AddCardModal.jsx';

export default function PageView({ page, onBack, onUpdatePage, onCardCreated, onCardDeleted }) {
  const { cards, loading, error, createCard, deleteCard } = useCards(page.id);
  const [showModal, setShowModal] = useState(false);

  const handleCreateCard = async (data) => {
    const card = await createCard(data);
    if (onCardCreated) onCardCreated(page.id);
    return card;
  };

  const handleDeleteCard = async (id) => {
    await deleteCard(id);
    if (onCardDeleted) onCardDeleted(page.id);
  };

  const totalPrice = cards.reduce((s, c) => s + (c.price || 0), 0);

  return (
    <div className="container">
      <header>
        <button className="back-btn" onClick={onBack}>← Retour</button>
        <div className="header-actions" style={{ marginTop: '16px' }}>
          <div style={{ flex: 1 }}>
            <EditableText
              tag="h1"
              value={page.title}
              onSave={(v) => onUpdatePage(page.id, { title: v })}
              placeholder="Titre de la page"
            />
            <EditableText
              tag="p"
              className="subtitle"
              value={page.description || ''}
              onSave={(v) => onUpdatePage(page.id, { description: v })}
              placeholder="Ajouter une description…"
            />
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Ajouter
          </button>
        </div>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{cards.length}</span>
            <span className="stat-label">Items</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalPrice.toFixed(2)} €</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {cards.length > 0 ? (totalPrice / cards.length).toFixed(2) : '0.00'} €
            </span>
            <span className="stat-label">Moyenne</span>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="state-message">Chargement…</div>
      ) : error ? (
        <div className="state-message">Erreur : {error}</div>
      ) : (
        <CardGrid cards={cards} onDelete={handleDeleteCard} />
      )}

      {showModal && (
        <AddCardModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateCard}
        />
      )}
    </div>
  );
}
