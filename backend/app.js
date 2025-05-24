const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const dashboardRoutes = require('./routes/dashboard');
const coachRoutes = require('./routes/coaches');
const planningRoutes = require('./routes/planning');
const factureRoutes = require('./routes/factures');
const receptionnisteRoutes = require("./routes/receptionniste.routes");
const abonnementRoutes = require('./routes/abonnements.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/planning', planningRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/receptionnistes', receptionnisteRoutes);
app.use('/api/abonnements', abonnementRoutes);

// Servir les fichiers statiques uploadés
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
