const cron = require('node-cron');
const notificationService = require('./notificationService');

function startAdminReminder() {
  // Tous les jours à 00h
  cron.schedule('0 0 * * *', async () => {
    console.log('📢 Vérification des abonnements terminés...');
    try {
      await notificationService.notifyEndOfMonthMembers();
      console.log('✅ Notifications créées pour les membres expirés');
    } catch (err) {
      console.error('Erreur lors de la notification des membres:', err);
    }
  });
}

module.exports = { startAdminReminder };
