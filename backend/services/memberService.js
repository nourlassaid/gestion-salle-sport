const db = require('../config/db'); // ta config avec mysql2/promise

// Récupérer tous les membres
async function getAllMembers() {
  const [rows] = await db.execute('SELECT * FROM members ORDER BY date_inscription DESC');
  return rows;
}

// Récupérer les membres dont l'abonnement se termine ce mois
async function getExpiringMembersThisMonth() {
  const [rows] = await db.execute(`
    SELECT * FROM members 
    WHERE MONTH(date_fin) = MONTH(CURDATE()) 
      AND YEAR(date_fin) = YEAR(CURDATE())
  `);
  return rows;
}

// Récupérer les membres inscrits il y a 1 mois
async function getMembersOneMonthAgo() {
  const [rows] = await db.execute(`
    SELECT * FROM members 
    WHERE date_inscription = DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
  `);
  return rows;
}

module.exports = { getAllMembers, getExpiringMembersThisMonth, getMembersOneMonthAgo };
