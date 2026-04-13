const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const pages = db.prepare(`
    SELECT p.*, COUNT(c.id) AS card_count
    FROM pages p
    LEFT JOIN cards c ON c.page_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `).all();
  res.json(pages);
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const result = db.prepare(
    'INSERT INTO pages (title, description) VALUES (?, ?)'
  ).run(title.trim(), (description || '').trim());
  const page = db.prepare(`
    SELECT p.*, COUNT(c.id) AS card_count
    FROM pages p
    LEFT JOIN cards c ON c.page_id = p.id
    WHERE p.id = ?
    GROUP BY p.id
  `).get(result.lastInsertRowid);
  res.status(201).json(page);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const page = db.prepare('SELECT id FROM pages WHERE id = ?').get(id);
  if (!page) return res.status(404).json({ error: 'Page not found' });

  const { title, description } = req.body;
  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  if (title !== undefined) {
    db.prepare('UPDATE pages SET title = ? WHERE id = ?').run(title.trim(), id);
  }
  if (description !== undefined) {
    db.prepare('UPDATE pages SET description = ? WHERE id = ?').run(description.trim(), id);
  }

  const updated = db.prepare(`
    SELECT p.*, COUNT(c.id) AS card_count
    FROM pages p
    LEFT JOIN cards c ON c.page_id = p.id
    WHERE p.id = ?
    GROUP BY p.id
  `).get(id);
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const page = db.prepare('SELECT id FROM pages WHERE id = ?').get(id);
  if (!page) return res.status(404).json({ error: 'Page not found' });
  db.prepare('DELETE FROM cards WHERE page_id = ?').run(id);
  db.prepare('DELETE FROM pages WHERE id = ?').run(id);
  res.status(204).end();
});

module.exports = router;
