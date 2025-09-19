const express = require('express');
const router = express.Router();
const receptionController = require('../controllers/receptionniste.controller');

router.post('/', receptionController.createReceptionniste);
router.get('/', receptionController.getReceptionnistes);
router.delete('/:id', receptionController.deleteReceptionniste);

module.exports = router;
