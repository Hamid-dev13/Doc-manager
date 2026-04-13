import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export function useCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/cards`);
      if (!res.ok) throw new Error('Failed to fetch cards');
      setCards(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCards(); }, [fetchCards]);

  const createCard = useCallback(async ({ title, description, price }) => {
    const res = await fetch(`${API_URL}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to create card');
    }
    const card = await res.json();
    setCards(prev => [card, ...prev]);
    return card;
  }, []);

  const deleteCard = useCallback(async (id) => {
    const res = await fetch(`${API_URL}/cards/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete card');
    setCards(prev => prev.filter(c => c.id !== id));
  }, []);

  return { cards, loading, error, createCard, deleteCard };
}
