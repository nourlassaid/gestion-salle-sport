const bcrypt = require('bcryptjs');
const db = require('../db');

// Fonction pour créer un utilisateur
async function createUser(username, password) {
  try {
    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Requête pour insérer l'utilisateur dans la base de données
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'insertion dans la base de données', err);
      } else {
        console.log('Utilisateur créé avec succès');
      }
    });
  } catch (error) {
    console.error('Erreur de hashage du mot de passe', error);
  }
}

// Exemple d'insertion d'un utilisateur
createUser('admin', 'password123');
