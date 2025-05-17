const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const memberRoutes = require('./routes/members');
const dashboardRoutes = require('./routes/dashboard');
const coachRoutes = require('./routes/coaches'); // Route coaches
const planningRoutes = require('./routes/planning');
const factureRoutes = require('./routes/factures');
const receptionnisteRoutes = require("./routes/receptionniste.routes");
const abonnementRoutes = require('./routes/abonnements.routes');



dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/coaches', coachRoutes); // ✅ ici
app.use('/api/planning', planningRoutes);
app.use('/api/factures', factureRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/receptionnistes", receptionnisteRoutes);
app.use('/api/abonnements', abonnementRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
