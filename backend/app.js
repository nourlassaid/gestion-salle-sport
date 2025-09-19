// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer les routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const coachRoutes = require('./routes/coaches');
const planningRoutes = require('./routes/planning');
const factureRoutes = require('./routes/factures');
const receptionnisteRoutes = require("./routes/receptionniste.routes");
const abonnementRoutes = require('./routes/abonnements.routes');
const statsRoutes = require('./routes/stats'); 
const notificationsRoutes = require('./routes/notifications');

// Scheduler notifications
const { startAdminReminder } = require('./services/adminNotifier');

// Initialiser l’application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/receptionnistes', receptionnisteRoutes);
app.use('/api/abonnements', abonnementRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/notifications', notificationsRoutes);

// Servir les fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Lancer le scheduler pour les notifications membres expirés
startAdminReminder();

// Page racine pour tester le serveur
app.get('/', (req, res) => {
  res.send('✅ Serveur POWER GYM NEFTA en ligne !');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
