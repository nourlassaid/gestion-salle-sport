const express = require('express');
const router = express.Router();
const db = require('../db'); // connexion MySQL
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 Crée le dossier si non existant
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/factures/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Route pour ajouter une facture
router.post('/add', upload.single('facture'), (req, res) => {
  const { client, date, montant, description } = req.body;
  const pdf_url = req.file ? `/uploads/factures/${req.file.filename}` : null;

  const sql = `INSERT INTO factures (client, date, montant, description, pdf_url)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [client, date, montant, description, pdf_url], (err, result) => {
    if (err) {
      console.error('Erreur MySQL :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(201).json({ message: 'Facture enregistrée avec succès' });
  });
});

// ✅ Route pour afficher la liste des factures
router.get('/', (req, res) => {
  db.query('SELECT * FROM factures ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération' });
    res.json(results);
  });
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM factures WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur suppression' });
    res.json({ message: 'Facture supprimée' });
  });
});


module.exports = router;
