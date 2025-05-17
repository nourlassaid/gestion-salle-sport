const express = require('express');
const router = express.Router();
const Abonnement = require('../models/abonnement.model');

// GET all
router.get('/', (req, res) => {
  Abonnement.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// GET by ID
router.get('/:id', (req, res) => {
  Abonnement.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// POST create
router.post('/', (req, res) => {
  Abonnement.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Abonnement ajouté', id: result.insertId });
  });
});

// PUT update
router.put('/:id', (req, res) => {
  Abonnement.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Abonnement mis à jour' });
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  Abonnement.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Abonnement supprimé' });
  });
});

module.exports = router;
