const db = require('../config/db');

// Ajouter un réceptionniste
exports.createReceptionniste = async (req, res) => {
  const { nom, prenom, telephone, email, sexe } = req.body;

  if (!nom || !prenom || !telephone || !email || !sexe) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    // Vérifier email existant
    const [exists] = await db.query("SELECT * FROM receptionnistes WHERE email = ?", [email]);
    if (exists.length > 0) return res.status(400).json({ error: "Email déjà utilisé" });

    // Ajouter le réceptionniste
    const [result] = await db.query(
      "INSERT INTO receptionnistes (nom, prenom, telephone, email, sexe) VALUES (?, ?, ?, ?, ?)",
      [nom, prenom, telephone, email, sexe]
    );

    res.status(201).json({ id: result.insertId, nom, prenom, telephone, email, sexe });
  } catch (err) {
    console.error("Erreur lors de l'ajout :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Récupérer tous les réceptionnistes
exports.getReceptionnistes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM receptionnistes");
    res.json(rows);
  } catch (err) {
    console.error("Erreur lors de la récupération :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Supprimer un réceptionniste
exports.deleteReceptionniste = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM receptionnistes WHERE id = ?", [id]);
    res.json({ message: "Réceptionniste supprimé" });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
