const express = require('express');
const router = express.Router();
const db = require('../config/db'); // connexion MySQL promise
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 📁 Configuration de Multer pour stocker les factures
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

router.post('/add', upload.single('facture'), async (req, res) => {
  try {
    const { client, date, montant, description } = req.body;

    if (!date) return res.status(400).json({ error: 'La date est obligatoire' });

    const pdf_url = req.file ? `/uploads/factures/${req.file.filename}` : null;

    const sql = `INSERT INTO factures (client, date, montant, description, pdf_url)
                 VALUES (?, ?, ?, ?, ?)`;

    const [result] = await db.query(sql, [client, date, montant, description, pdf_url]);

    res.status(201).json({ message: 'Facture enregistrée avec succès', id: result.insertId });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// ✅ Récupérer toutes les factures
router.get('/', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM factures ORDER BY date DESC');
    res.json(results);
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
});

// ✅ Supprimer une facture
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM factures WHERE id = ?', [id]);
    res.json({ message: 'Facture supprimée' });
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).json({ error: 'Erreur suppression' });
  }
});

module.exports = router;
