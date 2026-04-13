const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const cards = db.prepare('SELECT * FROM cards ORDER BY created_at DESC').all();
  res.json(cards);
});

router.post('/', (req, res) => {
  const { title, description, price } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const parsedPrice = parseFloat(price) || 0;
  const stmt = db.prepare(
    'INSERT INTO cards (title, description, price) VALUES (?, ?, ?)'
  );
  const result = stmt.run(title.trim(), (description || '').trim(), parsedPrice);
  const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(card);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const card = db.prepare('SELECT id FROM cards WHERE id = ?').get(id);
  if (!card) return res.status(404).json({ error: 'Card not found' });
  db.prepare('DELETE FROM cards WHERE id = ?').run(id);
  res.status(204).end();
});

module.exports = router;
