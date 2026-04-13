import DocCard from './DocCard.jsx';

export default function CardGrid({ cards, onDelete }) {
  return (
    <div className="grid">
      {cards.length === 0 ? (
        <div className="grid-empty">
          Aucun composant — cliquez sur &laquo; + Ajouter &raquo; pour commencer
        </div>
      ) : (
        cards.map((card, i) => (
          <DocCard
            key={card.id}
            card={card}
            index={i + 1}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
