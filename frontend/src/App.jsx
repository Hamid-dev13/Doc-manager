import { useState } from 'react';
import { useCards } from './hooks/useCards.js';
import Header from './components/Header.jsx';
import CardGrid from './components/CardGrid.jsx';
import AddCardModal from './components/AddCardModal.jsx';

export default function App() {
  const { cards, loading, error, createCard, deleteCard } = useCards();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="container">
        <div className="state-message">Chargement…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="state-message">Erreur : {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header cards={cards} onAddClick={() => setShowModal(true)} />
      <CardGrid cards={cards} onDelete={deleteCard} />
      {showModal && (
        <AddCardModal
          onClose={() => setShowModal(false)}
          onCreate={createCard}
        />
      )}
    </div>
  );
}
