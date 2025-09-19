const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Liste des clients
router.get('/', (req, res) => {
  db.query('SELECT * FROM client', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
