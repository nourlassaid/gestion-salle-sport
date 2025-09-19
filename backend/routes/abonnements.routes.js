const express = require('express');
const router = express.Router();
const Abonnement = require('../models/abonnement.model');

// GET all
router.get('/', async (req, res) => {
  try {
    const results = await Abonnement.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await Abonnement.getById(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create
router.post('/', async (req, res) => {
  try {
    const id = await Abonnement.create(req.body);
    res.json({ message: 'Abonnement ajouté', id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    await Abonnement.update(req.params.id, req.body);
    res.json({ message: 'Abonnement mis à jour' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Abonnement.delete(req.params.id);
    res.json({ message: 'Abonnement supprimé' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
