const db = require('../config/db'); // pool mysql2/promise

const Abonnement = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM abonnements');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM abonnements WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query('INSERT INTO abonnements SET ?', [data]);
    return result.insertId;
  },

  update: async (id, data) => {
    await db.query('UPDATE abonnements SET ? WHERE id = ?', [data, id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM abonnements WHERE id = ?', [id]);
  }
};

module.exports = Abonnement;
