const express = require('express');
const router = express.Router({ mergeParams: true });
const db = require('../db');

// GET /api/pages/:pageId/cards
router.get('/pages/:pageId/cards', (req, res) => {
  const { pageId } = req.params;
  const page = db.prepare('SELECT id FROM pages WHERE id = ?').get(pageId);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  const cards = db.prepare(
    'SELECT * FROM cards WHERE page_id = ? ORDER BY created_at DESC'
  ).all(pageId);
  res.json(cards);
});

// POST /api/pages/:pageId/cards
router.post('/pages/:pageId/cards', (req, res) => {
  const { pageId } = req.params;
  const page = db.prepare('SELECT id FROM pages WHERE id = ?').get(pageId);
  if (!page) return res.status(404).json({ error: 'Page not found' });

  const { title, description, price } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const parsedPrice = parseFloat(price) || 0;
  const result = db.prepare(
    'INSERT INTO cards (title, description, price, page_id) VALUES (?, ?, ?, ?)'
  ).run(title.trim(), (description || '').trim(), parsedPrice, pageId);
  const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(card);
});

// DELETE /api/cards/:id
router.delete('/cards/:id', (req, res) => {
  const { id } = req.params;
  const card = db.prepare('SELECT id FROM cards WHERE id = ?').get(id);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  db.prepare('DELETE FROM cards WHERE id = ?').run(id);
  res.status(204).end();
});

module.exports = router;
