const pool = require('../config/db');

// Publier une notification
async function publierNotification(message) {
  try {
    const [result] = await pool.query(
      'INSERT INTO notifications (message, statut) VALUES (?, ?)',
      [message, 'Non lue']
    );
    console.log('✅ Notification ajoutée :', message);
    return result.insertId;
  } catch (error) {
    console.error('❌ Erreur ajout notification :', error);
  }
}

module.exports = { publierNotification };
