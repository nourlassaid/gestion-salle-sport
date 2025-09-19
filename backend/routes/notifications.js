const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

router.get('/', async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/mark-as-read/:id', async (req, res) => {
  try {
    await notificationService.markAsRead(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/mark-all-as-read', async (req, res) => {
  try {
    await notificationService.markAllAsRead();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
