import { useState } from 'react';
import PageCard from '../components/PageCard.jsx';
import AddPageModal from '../components/AddPageModal.jsx';

export default function HomeView({ pages, onNavigate, onCreatePage, onDeletePage }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
      <header>
        <div className="header-actions">
          <div>
            <div className="tag">Budget Tracker</div>
            <h1>Super <span>Cost Tracker</span></h1>
            <p className="subtitle">Suivez et estimez vos budgets par catégorie</p>
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Nouveau budget
          </button>
        </div>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{pages.length}</span>
            <span className="stat-label">Budgets</span>
          </div>
        </div>
      </header>

      <div className="grid">
        {pages.length === 0 ? (
          <div className="grid-empty">Aucun budget — cliquez sur "+ Nouveau budget" pour commencer</div>
        ) : (
          pages.map(page => (
            <PageCard
              key={page.id}
              page={page}
              onClick={() => onNavigate(page.id)}
              onDelete={onDeletePage}
            />
          ))
        )}
      </div>

      {showModal && (
        <AddPageModal
          onClose={() => setShowModal(false)}
          onCreate={onCreatePage}
        />
      )}
    </div>
  );
}
