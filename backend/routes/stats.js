const express = require('express');
const router = express.Router();
const db = require('../config/db'); // mysql2/promise

// Stats globales
router.get('/global', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM members) AS totalMembres,
        (SELECT COUNT(*) FROM coaches) AS totalCoachs
    `);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Stats mensuelles par sexe
router.get('/monthly-sex', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE_FORMAT(date_inscription, '%Y-%m') AS month,
        SUM(CASE WHEN sexe='Homme' THEN 1 ELSE 0 END) AS totalMale,
        SUM(CASE WHEN sexe='Femme' THEN 1 ELSE 0 END) AS totalFemale
      FROM members
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
