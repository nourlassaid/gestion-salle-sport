const express = require('express');
const router = express.Router();
const db = require('../db');

// Ajouter un coach
router.post('/add', (req, res) => {
  const { nom, prenom, telephone, specialite, sexe } = req.body;

  if (!nom || !prenom || !telephone || !specialite || !sexe) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  const sql = `INSERT INTO coaches (nom, prenom, telephone, specialite, sexe) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nom, prenom, telephone, specialite, sexe], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Coach ajouté avec succès', id: result.insertId });
  });
});

// Lister tous les coachs
router.get('/list', (req, res) => {
  db.query('SELECT * FROM coaches ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Récupérer un coach par ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM coaches WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json(result[0]);
  });
});

// Modifier un coach
router.put('/update/:id', (req, res) => {
  const { nom, prenom, telephone, specialite, sexe } = req.body;

  if (!nom || !prenom || !telephone || !specialite || !sexe) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  const sql = `UPDATE coaches SET nom = ?, prenom = ?, telephone = ?, specialite = ?, sexe = ? WHERE id = ?`;
  db.query(sql, [nom, prenom, telephone, specialite, sexe, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json({ message: 'Coach modifié avec succès' });
  });
});

// Supprimer un coach
router.delete('/delete/:id', (req, res) => {
  db.query('DELETE FROM coaches WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json({ message: 'Coach supprimé avec succès' });
  });
});

module.exports = router;
