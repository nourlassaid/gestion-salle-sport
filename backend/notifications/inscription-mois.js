const db = require('../db');
const envoyerNotification = require('./notificationPublisher');

async function notifierMembresUnMois() {
  try {
    const [rows] = await db.promise().query(`
      SELECT id, nom, prenom
      FROM members
      WHERE DATE(date_inscription) = DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    `);

    if (rows.length === 0) {
      console.log('✅ Aucun membre inscrit il y a 1 mois.');
      return;
    }

    const noms = rows.map(m => `${m.prenom} ${m.nom}`).join(', ');
    const message = `📅 ${rows.length} membre(s) inscrits il y a 1 mois : ${noms}`;

    await envoyerNotification(message, 'info');
    console.log('🔔 Notification ajoutée avec succès.');
  } catch (error) {
    console.error('❌ Erreur dans notifierMembresUnMois :', error);
  }
}

module.exports = notifierMembresUnMois;
