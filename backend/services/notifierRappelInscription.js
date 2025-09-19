const pool = require('../config/db');
const { publierNotification } = require('./notificationPublisher');

async function notifierRappelInscription() {
  try {
    // Récupérer membres inscrits il y a 1 mois
    const [rows] = await pool.query(`
      SELECT id, nom, prenom, date_inscription
      FROM membres
      WHERE DATE_ADD(date_inscription, INTERVAL 1 MONTH) = CURDATE()
    `);

    for (const membre of rows) {
      const message = `${membre.prenom} ${membre.nom} est inscrit depuis 1 mois (le ${membre.date_inscription.toISOString().split('T')[0]})`;
      await publierNotification(message);
    }
  } catch (error) {
    console.error('❌ Erreur notifierRappelInscription :', error);
  }
}

module.exports = notifierRappelInscription;
