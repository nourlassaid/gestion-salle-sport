const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Total global
router.get('/stats', (req, res) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM members) AS totalMembres,
      (SELECT COUNT(*) FROM coaches) AS totalCoachs
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur base de données:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results[0]);
  });
});

// Total par mois
router.get('/stats/monthly', (req, res) => {
  const sql = `
    SELECT 'members' AS type, DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total
    FROM members
    GROUP BY month
    UNION ALL
    SELECT 'coaches' AS type, DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total
    FROM coaches
    GROUP BY month
    ORDER BY month;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur base de données:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
});

module.exports = router;
