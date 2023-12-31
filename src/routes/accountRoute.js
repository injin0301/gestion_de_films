const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const {
  authenticate,
  beSureUserIsAdmin,
} = require("../middlewares/middleware");

router.get("/:uid", authenticate, accountController.getAccountByUid);

router.put(
  "/:uid",
  authenticate,
  beSureUserIsAdmin,
  accountController.UpdateAccountByUid
);

module.exports = router;
