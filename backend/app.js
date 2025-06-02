const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Importation des routes
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const coachRoutes = require('./routes/coaches');
const planningRoutes = require('./routes/planning');
const factureRoutes = require('./routes/factures');
const receptionnisteRoutes = require('./routes/receptionniste.routes');
const abonnementRoutes = require('./routes/abonnements.routes');
const statsRoutes = require('./routes/stats');

dotenv.config();
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

// Fichiers statiques uploadés
app.use('/uploads', express.static('uploads'));

// ➕ Servir Angular compilé
app.use(express.static(path.join(__dirname, '../dist/gymnefta')));

// ➕ Redirection vers index.html pour le SPA Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/gymnefta/index.html'));
});

// Lancer serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});
