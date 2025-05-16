const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/stats', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM members) AS totalMembres,
      (SELECT COUNT(*) FROM coachs) AS totalCoachs,
      (SELECT COUNT(*) FROM abonnements) AS totalAbonnements,
      (SELECT COUNT(*) FROM activites) AS totalActivites
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results[0]); // Résultat sous forme { totalMembres, totalCoachs, ... }
  });
});

module.exports = router;
