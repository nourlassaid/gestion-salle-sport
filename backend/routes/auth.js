const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // mysql2/promise

// ==========================
// LOGIN
// ==========================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });

  try {
    const [results] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
    if (results.length === 0) return res.status(400).json({ message: 'Utilisateur introuvable' });

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' });

    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar || null
      }
    });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// ==========================
// REGISTER
// ==========================
router.post('/register', async (req, res) => {
  const { username, password, name, avatar } = req.body;
  if (!username || !password || !name) return res.status(400).json({ message: 'Tous les champs sont requis' });

  try {
    const [results] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
    if (results.length > 0) return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO user (username, password, name, avatar) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, name, avatar || null]);

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (err) {
    console.error('Erreur register:', err);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
});

// ==========================
// LOGOUT
// ==========================
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie' });
});

module.exports = router;
