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
            <div className="tag">Workspace</div>
            <h1>Doc <span>Manager</span></h1>
            <p className="subtitle">Gérez vos pages et leur contenu</p>
          </div>
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Nouvelle page
          </button>
        </div>
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{pages.length}</span>
            <span className="stat-label">Pages</span>
          </div>
          <div className="stat">
            <span className="stat-value">{pages.reduce((s, p) => s + (p.card_count || 0), 0)}</span>
            <span className="stat-label">Items total</span>
          </div>
        </div>
      </header>

      <div className="grid">
        {pages.length === 0 ? (
          <div className="grid-empty">Aucune page — cliquez sur "+ Nouvelle page" pour commencer</div>
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
