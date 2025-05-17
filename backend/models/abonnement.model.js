const db = require('../db');

const Abonnement = {
  getAll: (callback) => {
    db.query('SELECT * FROM abonnements', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM abonnements WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO abonnements SET ?', [data], callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE abonnements SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM abonnements WHERE id = ?', [id], callback);
  }
};

module.exports = Abonnement;
