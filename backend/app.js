const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const db = require('./db');
const dashboardRoutes = require('./routes/dashboard');
const coachRoutes = require('./routes/coaches'); // Une seule fois ici
const planningRoutes = require('./routes/planning');
const factureRoutes = require('./routes/factures');



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/coaches', coachRoutes); // Assure-toi d'utiliser uniquement cette ro
//ute
app.use('/api/planning', planningRoutes);
app.use('/uploads', express.static('uploads')); // pour servir les images
app.use('/api/factures', factureRoutes);
app.use('/uploads', express.static('uploads')); // pour servir les PDF




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
