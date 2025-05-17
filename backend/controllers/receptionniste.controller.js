const db = require("../db");

// Ajouter un réceptionniste
exports.createReceptionniste = (req, res) => {
  const { nom, prenom, telephone, email, sexe } = req.body;
  const sql = "INSERT INTO receptionnistes (nom, prenom, telephone, email, sexe) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nom, prenom, telephone, email, sexe], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout :", err);
      return res.status(500).json({ error: "Erreur lors de l'ajout" });
    }
    res.status(201).json({ message: "Réceptionniste ajouté avec succès" });
  });
};

// Obtenir tous les réceptionnistes
exports.getReceptionnistes = (req, res) => {
  db.query("SELECT * FROM receptionnistes", (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};

// Mettre à jour un réceptionniste
exports.updateReceptionniste = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, telephone, email, sexe } = req.body;
  const sql = "UPDATE receptionnistes SET nom = ?, prenom = ?, telephone = ?, email = ?, sexe = ? WHERE id = ?";
  db.query(sql, [nom, prenom, telephone, email, sexe, id], (err, result) => {
    if (err) {
      console.error("Erreur de mise à jour :", err);
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
    res.json({ message: "Réceptionniste mis à jour" });
  });
};

// Supprimer un réceptionniste
exports.deleteReceptionniste = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM receptionnistes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur de suppression :", err);
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }
    res.json({ message: "Réceptionniste supprimé" });
  });
};
