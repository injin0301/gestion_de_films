const accountService = require("../services/accountService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let accountData = req.body;

  if (!accountData.login || !accountData.password) {
    return res.status(400).send("Not created.");
  }

  // For security password
  const hasUpperCase = /[A-Z]/.test(accountData.password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
    accountData.password
  );

  if (accountData.password.length > 15) {
    return res.status(400).send("Password should be maximum 14 characters.");
  } else if (accountData.password.length < 8) {
    return res.status(400).send("Password should be minimum 8 characters.");
  } else if (!hasUpperCase) {
    return res
      .status(400)
      .send("Password should contains at least one uppercase letter.");
  } else if (!hasSpecialCharacter) {
    return res
      .status(400)
      .send("Password should contains at least one special character.");
  }

  let password = await bcrypt.hashSync(accountData.password, 8);
  const newAccount = {
    login: accountData.login.toLowerCase(),
    password: password,
    roles: "ROLE_USER",
    status: "open",
  };

  if (await accountService.isAccountExist(newAccount.login)) {
    return res.status(403).send("This account is already exist.");
  }

  let createdAccount;

  try {
    createdAccount = await accountService.createAccount(newAccount);

    if (!createdAccount) {
      return res.status(400).send("Not created.");
    }
    return res.status(201).send({ status: "OK", data: createdAccount });
  } catch (err) {
    console.error("Failed to retrieve data : ", err);
  }
};

const login = async (req, res) => {
  let user = await accountService.getOneAccountByLogin(
    req.body.login.toLowerCase()
  );

  if (user == null) {
    return res.status(404).send("User don't exist.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.status(404).send("Password is not correct.");
  }
  const token = jwt.sign({ login: user.login }, "secretkey", {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ login: user.login }, "secretkey", {
    expiresIn: "2h",
  });

  return res.status(201).send({
    accessToken: token,
    accessTokenExpiresAt: new Date(Date.now() + 120 * 60 * 1000),
    refreshToken: refreshToken,
    refreshTokenExpiresAt: new Date(Date.now() + 180 * 60 * 1000),
  });
};

const validateToken = async (req, res) => {
  const token = req.params.accessToken;

  if (token == undefined) {
    return res.status(404).send("Token is not found.");
  }

  try {
    const decodeToken = await jwt.verify(token, "secretkey");

    // Consider it as valide
    const expireTime = new Date(decodeToken.exp * 1000);
    expireTime.setHours(expireTime.getHours() + 1);

    res.status(200).send({
      accessToken: token,
      accessTokenExpiresAt: expireTime,
    });
  } catch (err) {
    res.status(404).send("Token has been expired");
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.params.refreshToken;

  if (refreshToken == undefined) {
    return res.status(404).send("Refresh Token is not found.");
  }

  try {
    const decodeToken = await jwt.verify(refreshToken, "secretkey");

    const newAccessToken = jwt.sign({ login: decodeToken.login }, "secretkey", {
      expiresIn: "1h",
    });
    
    const newRefreshToken = jwt.sign(
      { login: decodeToken.login },
      "secretkey",
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({
      accessToken: newAccessToken,
      accessTokenExpiresAt: new Date(Date.now() + 120 * 60 * 1000), // Expiration dans 60 minutes
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt: new Date(Date.now() + 180 * 60 * 1000), // Expiration dans 120 minutes
    });
  } catch (error) {
    return res.status(403).send("Refresh token invalid or expired");
  }
};

module.exports = {
  register,
  login,
  validateToken,
  refreshToken,
};
