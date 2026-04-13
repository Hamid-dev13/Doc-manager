import { useState } from 'react';
import { usePages } from './hooks/usePages.js';
import HomeView from './views/HomeView.jsx';
import PageView from './views/PageView.jsx';

export default function App() {
  const { pages, loading, error, createPage, updatePage, deletePage, incrementCardCount, decrementCardCount } = usePages();
  const [currentPageId, setCurrentPageId] = useState(null);

  if (loading) {
    return <div className="container"><div className="state-message">Chargement…</div></div>;
  }

  if (error) {
    return <div className="container"><div className="state-message">Erreur : {error}</div></div>;
  }

  if (currentPageId !== null) {
    const page = pages.find(p => p.id === currentPageId);
    if (!page) { setCurrentPageId(null); return null; }
    return (
      <PageView
        page={page}
        onBack={() => setCurrentPageId(null)}
        onUpdatePage={updatePage}
        onCardCreated={incrementCardCount}
        onCardDeleted={decrementCardCount}
      />
    );
  }

  return (
    <HomeView
      pages={pages}
      onNavigate={setCurrentPageId}
      onCreatePage={createPage}
      onDeletePage={deletePage}
    />
  );
}
