const db = require('../db');

// Enregistre une notification en base
function publishNotification(type, message) {
  const sql = "INSERT INTO notifications (type, message, date_creation) VALUES (?, ?, NOW())";
  db.query(sql, [type, message], (err) => {
    if (err) {
      console.error('❌ Erreur lors de l’enregistrement de la notification :', err);
    } else {
      console.log('✅ Notification enregistrée dans la base de données.');
    }
  });
}

module.exports = publishNotification;
