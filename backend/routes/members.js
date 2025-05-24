// routes/members.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Rechercher un membre par nom, prénom ou téléphone
router.get('/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Paramètre "query" requis' });
  }
  const searchTerm = `%${query}%`;
  const sql = `
    SELECT *, TIMESTAMPDIFF(MONTH, date_inscription, CURDATE()) AS mois_inscrits
    FROM members 
    WHERE nom LIKE ? OR prenom LIKE ? OR telephone LIKE ?
  `;
  db.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results);
  });
});

// Ajouter un membre
router.post('/add', (req, res) => {
  const { nom, prenom, telephone, date_inscription, prix, sexe, enfant } = req.body;
  const sql = `INSERT INTO members (nom, prenom, telephone, date_inscription, prix, sexe, enfant) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [nom, prenom, telephone, date_inscription, prix, sexe, enfant], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(201).json({ message: 'Membre ajouté avec succès', id: result.insertId });
  });
});

// Récupérer tous les membres
router.get('/', (req, res) => {
  const sql = `
    SELECT *, TIMESTAMPDIFF(MONTH, date_inscription, CURDATE()) AS mois_inscrits
    FROM members
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur serveur' });
    res.json(results);
  });
});

// Récupérer un membre par ID
router.get('/:id', (req, res) => {
  const sql = `
    SELECT *, TIMESTAMPDIFF(MONTH, date_inscription, CURDATE()) AS mois_inscrits
    FROM members WHERE id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Membre non trouvé' });
    res.json(results[0]);
  });
});
// Modifier un membre
router.put('/:id', (req, res) => {
  const { nom, prenom, telephone, date_inscription, prix, sexe, enfant } = req.body;

  const sql = `
    UPDATE members
    SET nom = ?, prenom = ?, telephone = ?, date_inscription = ?, prix = ?, sexe = ?, enfant = ?
    WHERE id = ?
  `;

  db.query(sql, [nom, prenom, telephone, date_inscription, prix, sexe, enfant, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    res.json({ message: 'Membre modifié avec succès' });
  });
});


// Supprimer un membre
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM members WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Membre supprimé avec succès' });
  });
});

module.exports = router;