const express = require('express');
const router = express.Router();
const db = require('../db');

// Ajouter un membre
router.post('/add', (req, res) => {
  const { nom, prenom, telephone, date_inscription, prix } = req.body;

  const sql = `
    INSERT INTO members (nom, prenom, telephone, date_inscription, prix)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nom, prenom, telephone, date_inscription, prix], (err, result) => {
    if (err) {
      console.error('Erreur lors de l’ajout du membre:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(201).json({ message: 'Membre ajouté avec succès', id: result.insertId });
  });
});
router.get('/', (req, res) => {
    db.query('SELECT * FROM members', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des membres :', err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }
      res.json(results);
    });
  });
  
  

module.exports = router;
