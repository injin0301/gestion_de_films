const jwt = require("jsonwebtoken");
const accountService = require("../services/accountService");

const authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(403).json("There is no token in the request");
  }

  const token = header.split(" ")[1];
  jwt.verify(token, "secretkey", (err, user) => {
    if (err) {
      return res.status(403).json("Token is invalid");
    }
    req.login = user.login;
    next();
  });
};

const beSureUserIsAdmin = async (req, res, next) => {
  const userIsAdmin = await accountService.isAdmin(null, req.login);

  if (req.login && userIsAdmin) {
    // User is admin
    return next();
  }
  return res
    .status(403)
    .json({ message: "User is not admin" });
};

module.exports = {
  authenticate,
  beSureUserIsAdmin,
};
