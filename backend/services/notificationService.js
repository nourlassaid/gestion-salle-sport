// services/notification.service.js
const db = require('../config/db'); // assure-toi que db.js existe et exporte la connexion MySQL

class NotificationService {
  async createNotification(message) {
    const [result] = await db.query(
      'INSERT INTO notifications (message, statut) VALUES (?, "Non lue")',
      [message]
    );
    return result;
  }

  async getNotifications() {
    const [rows] = await db.query('SELECT * FROM notifications ORDER BY created_at DESC');
    return rows;
  }

  async markAsRead(id) {
    await db.query('UPDATE notifications SET statut = "Lue" WHERE id = ?', [id]);
  }

  async markAllAsRead() {
    await db.query('UPDATE notifications SET statut = "Lue" WHERE statut = "Non lue"');
  }

  async notifyEndOfMonthMembers() {
    const [membres] = await db.query('SELECT * FROM members WHERE date_fin = CURDATE() AND notified = 0');
    for (const m of membres) {
      const message = `Le membre ${m.nom} ${m.prenom} a terminé son abonnement aujourd'hui.`;
      await this.createNotification(message);
      await db.query('UPDATE members SET notified = 1 WHERE id = ?', [m.id]);
    }
  }
}

module.exports = new NotificationService();
