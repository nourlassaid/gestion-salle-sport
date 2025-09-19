const pool = require('../config/db');
const { publierNotification } = require('./notificationPublisher');

async function notifierAbonnementsExpires() {
  try {
    const [rows] = await pool.query(`
      SELECT m.id, m.nom, m.prenom, a.date_fin
      FROM membres m
      JOIN abonnements a ON m.id = a.membre_id
      WHERE a.date_fin < CURDATE()
    `);

    for (const membre of rows) {
      const message = `L’abonnement de ${membre.prenom} ${membre.nom} est terminé depuis le ${membre.date_fin.toISOString().split('T')[0]}`;
      await publierNotification(message);
    }
  } catch (error) {
    console.error('❌ Erreur notifierAbonnementsExpires :', error);
  }
}

module.exports = notifierAbonnementsExpires;
