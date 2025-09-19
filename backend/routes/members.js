const express = require('express');
const router = express.Router();
const db = require('../config/db'); // connexion mysql2/promise
const { sendNotification } = require('../services/notificationService');


// 🔍 Rechercher un membre par nom, prénom ou téléphone
router.get('/search', async (req, res) => {
  try {
    const search = req.query.q;
    if (!search) {
      return res.status(400).json({ message: 'Paramètre "q" requis' });
    }

    const searchTerm = `%${search}%`;

    const sql = `
      SELECT *, 
        TIMESTAMPDIFF(MONTH, date_inscription, CURDATE()) AS mois_inscrits,
        DATE_FORMAT(date_inscription, '%M %Y') AS mois_inscription
      FROM members
      WHERE 
        CONCAT(nom, ' ', prenom) LIKE ? OR 
        CONCAT(prenom, ' ', nom) LIKE ? OR 
        nom LIKE ? OR 
        prenom LIKE ? OR 
        telephone LIKE ?
      ORDER BY date_inscription DESC
    `;

    const [results] = await db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]);
    res.json(results);
  } catch (err) {
    console.error('❌ Erreur serveur dans /search:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// ➕ Ajouter un membre
router.post('/add', async (req, res) => {
  try {
    const { nom, prenom, telephone, date_inscription, prix, sexe, enfant, date_fin } = req.body;

    const sql = `
      INSERT INTO members (nom, prenom, telephone, date_inscription, prix, sexe, enfant, date_fin, notified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)
    `;

    const [result] = await db.query(sql, [
      nom,
      prenom,
      telephone,
      date_inscription,
      prix,
      sexe,
      enfant ? 1 : 0,
      date_fin
    ]);

    res.status(201).json({ message: '✅ Membre ajouté avec succès', id: result.insertId });
  } catch (err) {
    console.error('❌ Erreur POST /add:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// 📋 Récupérer tous les membres
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT *, TIMESTAMPDIFF(MONTH, date_inscription, CURDATE()) AS mois_inscrits
      FROM members
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ Erreur GET /members:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// 📌 Récupérer un membre par ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members WHERE id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Erreur GET /:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// 📅 Membres dont l'abonnement est expiré
router.get('/expired', async (req, res) => {
  try {
    const sql = `
      SELECT id, nom, prenom, telephone, date_inscription, prix, sexe, enfant, date_fin
      FROM members
      WHERE date_fin < CURDATE()
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ Erreur /expired:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// 📌 Récupérer un membre par ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Erreur GET /:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// ✏️ Modifier un membre
router.put('/:id', async (req, res) => {
  try {
    const { nom, prenom, telephone, date_inscription, date_fin, prix, sexe, enfant } = req.body;

    const sql = `
      UPDATE members
      SET nom = ?, prenom = ?, telephone = ?, date_inscription = ?, date_fin = ?, prix = ?, sexe = ?, enfant = ?
      WHERE id = ?
    `;

    const [result] = await db.query(sql, [
      nom, prenom, telephone, date_inscription, date_fin, prix, sexe, enfant, req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    res.json({ message: '✅ Membre modifié avec succès' });
  } catch (err) {
    console.error('❌ Erreur PUT /:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// ❌ Supprimer un membre
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM members WHERE id = ?', [req.params.id]);
    res.json({ message: '🗑️ Membre supprimé avec succès' });
  } catch (err) {
    console.error('❌ Erreur DELETE /:id:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// 📊 Statistiques : nombre de membres par mois
router.get('/stats/monthly-members', async (req, res) => {
  try {
    const sql = `
      SELECT DATE_FORMAT(date_inscription, '%Y-%m') AS month, COUNT(*) AS total
      FROM members
      GROUP BY month
      ORDER BY month;
    `;
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    console.error('❌ Erreur /stats/monthly-members:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



module.exports = router;
