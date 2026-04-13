import { useState, useEffect, useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export function usePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPages = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/pages`);
      if (!res.ok) throw new Error('Failed to fetch pages');
      setPages(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const createPage = useCallback(async ({ title, description }) => {
    const res = await fetch(`${API_URL}/pages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to create page');
    }
    const page = await res.json();
    setPages(prev => [page, ...prev]);
    return page;
  }, []);

  const updatePage = useCallback(async (id, patch) => {
    const res = await fetch(`${API_URL}/pages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Failed to update page');
    }
    const page = await res.json();
    setPages(prev => prev.map(p => p.id === id ? page : p));
    return page;
  }, []);

  const deletePage = useCallback(async (id) => {
    const res = await fetch(`${API_URL}/pages/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete page');
    setPages(prev => prev.filter(p => p.id !== id));
  }, []);

  const incrementCardCount = useCallback((pageId) => {
    setPages(prev => prev.map(p =>
      p.id === pageId ? { ...p, card_count: (p.card_count || 0) + 1 } : p
    ));
  }, []);

  const decrementCardCount = useCallback((pageId) => {
    setPages(prev => prev.map(p =>
      p.id === pageId ? { ...p, card_count: Math.max(0, (p.card_count || 0) - 1) } : p
    ));
  }, []);

  return { pages, loading, error, createPage, updatePage, deletePage, incrementCardCount, decrementCardCount };
}
