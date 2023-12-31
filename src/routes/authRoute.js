const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/validate/:accessToken", authController.validateToken);

router.post("/refresh-token/:refreshToken", authController.refreshToken);

module.exports = router;
