const express = require("express");
const router = express.Router();
const controller = require("../controllers/receptionniste.controller");

router.post("/", controller.createReceptionniste);
router.get("/", controller.getReceptionnistes);
router.put("/:id", controller.updateReceptionniste);
router.delete("/:id", controller.deleteReceptionniste);

module.exports = router;
