const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Get all ideas
app.get('/api/ideas', (req, res) => {
  const { status, pinned, favorite, search } = req.query;
  let query = 'SELECT * FROM ideas WHERE 1=1';
  const params = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  if (pinned === 'true') {
    query += ' AND is_pinned = 1';
  }
  if (favorite === 'true') {
    query += ' AND is_favorite = 1';
  }
  if (search) {
     query += ' AND (title LIKE ? OR content LIKE ?)';
     params.push(`%${search}%`, `%${search}%`);
  }

  query += ' ORDER BY is_pinned DESC, updated_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get stats
app.get('/api/stats', (req, res) => {
    const stats = {};
    db.get("SELECT COUNT(*) as count FROM ideas", [], (err, row) => {
        if(err) return res.status(500).json({error: err.message});
        stats.total = row.count;
        
        db.get("SELECT COUNT(*) as count FROM ideas WHERE status = 'in-progress'", [], (err, row) => {
            if(err) return res.status(500).json({error: err.message});
            stats.inProgress = row.count;

            db.get("SELECT COUNT(*) as count FROM ideas WHERE status = 'completed'", [], (err, row) => {
                 if(err) return res.status(500).json({error: err.message});
                 stats.completed = row.count;
                 res.json({data: stats});
            });
        });
    });
});

// Get single idea
app.get('/api/ideas/:id', (req, res) => {
  const sql = 'SELECT * FROM ideas WHERE id = ?';
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

// Create idea
app.post('/api/ideas', (req, res) => {
  const { title, content, category, tags } = req.body;
  const sql = 'INSERT INTO ideas (title, content, category, tags) VALUES (?,?,?,?)';
  const params = [title, content, category, JSON.stringify(tags || [])];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { id: this.lastID, ...req.body }
    });
  });
});

// Update idea
app.put('/api/ideas/:id', (req, res) => {
  const { title, content, status, category, tags, is_pinned, is_favorite } = req.body;
  // Dynamic update is better but let's keep it simple for now or fetch existing first.
  // We'll update fields provided.
  
  // Actually, let's just do a specific update for simplicity or dynamic construction
  const updates = [];
  const params = [];
  
  if (title !== undefined) { updates.push('title = ?'); params.push(title); }
  if (content !== undefined) { updates.push('content = ?'); params.push(content); }
  if (status !== undefined) { updates.push('status = ?'); params.push(status); }
  if (category !== undefined) { updates.push('category = ?'); params.push(category); }
  if (tags !== undefined) { updates.push('tags = ?'); params.push(JSON.stringify(tags)); }
  if (is_pinned !== undefined) { updates.push('is_pinned = ?'); params.push(is_pinned ? 1 : 0); }
  if (is_favorite !== undefined) { updates.push('is_favorite = ?'); params.push(is_favorite ? 1 : 0); }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');

  const sql = `UPDATE ideas SET ${updates.join(', ')} WHERE id = ?`;
  params.push(req.params.id);

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      changes: this.changes
    });
  });
});

// Delete idea
app.delete('/api/ideas/:id', (req, res) => {
  const sql = 'DELETE FROM ideas WHERE id = ?';
  const params = [req.params.id];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'deleted', changes: this.changes });
  });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
