const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// Connexion
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis' });
  }

  db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) {
      return res.status(400).json({ message: 'Utilisateur introuvable' });
    }

    const user = results[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Connexion réussie
    return res.status(200).json({ message: 'Connexion réussie', user: { id: user.id, username: user.username, name: user.name } });
  });
});

// Inscription
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    db.query('SELECT * FROM user WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });
      if (results.length > 0) {
        return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer l'utilisateur dans la base de données
      db.query(
        'INSERT INTO user (username, password, name) VALUES (?, ?, ?)',
        [username, hashedPassword, name],
        (err, results) => {
          if (err) return res.status(500).json({ message: 'Erreur lors de l\'inscription' });

          return res.status(201).json({ message: 'Inscription réussie' });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
});

module.exports = router;
