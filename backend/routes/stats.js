const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/stats => Totaux globaux
router.get('/', (req, res) => {
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

// GET /api/stats/monthly => Stats par mois pour membres et coachs
router.get('/monthly', (req, res) => {
  const sql = `
    SELECT 'members' AS type, DATE_FORMAT(date_inscription, '%Y-%m') AS month, COUNT(*) AS total
    FROM members
    GROUP BY month
    UNION ALL
    SELECT 'coaches' AS type, DATE_FORMAT(date_recrutement, '%Y-%m') AS month, COUNT(*) AS total
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

// GET /api/stats/members/monthly-sex => Stats par mois et sexe pour membres
router.get('/members/monthly-sex', (req, res) => {
  const sql = `
    SELECT 
      DATE_FORMAT(date_inscription, '%Y-%m') AS month,
      sexe,
      COUNT(*) AS total
    FROM members
    GROUP BY month, sexe
    ORDER BY month ASC;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur base de données:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.month]) {
        grouped[row.month] = {
          month: row.month,
          totalMale: 0,
          totalFemale: 0
        };
      }

      if (row.sexe && row.sexe.toLowerCase() === 'homme') {
        grouped[row.month].totalMale = row.total;
      } else if (row.sexe && row.sexe.toLowerCase() === 'femme') {
        grouped[row.month].totalFemale = row.total;
      }
    });

    res.json(Object.values(grouped));
  });
});

module.exports = router;
