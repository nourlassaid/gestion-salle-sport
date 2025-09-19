// routes/coaches.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Assurez-vous que c'est un pool promise MySQL2

// ==========================
// Ajouter un coach
// ==========================
router.post('/add', async (req, res) => {
  const { nom, prenom, telephone, specialite, sexe } = req.body;

  if (!nom || !prenom || !telephone || !specialite || !sexe) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO coaches (nom, prenom, telephone, specialite, sexe) VALUES (?, ?, ?, ?, ?)',
      [nom, prenom, telephone, specialite, sexe]
    );
    res.status(201).json({ message: 'Coach ajouté avec succès', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// Lister tous les coachs
// ==========================
router.get('/list', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM coaches ORDER BY id DESC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// Récupérer un coach par ID
// ==========================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM coaches WHERE id = ?', [id]);
    if (results.length === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// Modifier un coach
// ==========================
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, telephone, specialite, sexe } = req.body;

  if (!nom || !prenom || !telephone || !specialite || !sexe) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE coaches SET nom = ?, prenom = ?, telephone = ?, specialite = ?, sexe = ? WHERE id = ?',
      [nom, prenom, telephone, specialite, sexe, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json({ message: 'Coach modifié avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// Supprimer un coach
// ==========================
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM coaches WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json({ message: 'Coach supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Modifier un coach
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, telephone, specialite, sexe } = req.body;

  if (!nom || !prenom || !telephone || !specialite || !sexe) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE coaches SET nom = ?, prenom = ?, telephone = ?, specialite = ?, sexe = ? WHERE id = ?',
      [nom, prenom, telephone, specialite, sexe, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Coach non trouvé' });
    res.json({ message: 'Coach modifié avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
