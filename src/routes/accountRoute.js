const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/:uid", accountController.getAccountByUid);

router.put("/:uid", accountController.UpdateAccountByUid);

module.exports = router;

//Permet de créer un jeton utilisable par d’autres services par la suite
//Permet de renouveler régulièrement ce jeton sans avoir à refaire toute la procédure
//protégée du brut force
