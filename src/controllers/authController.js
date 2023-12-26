const accountService = require("../services/accountService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let accountData = req.body;

  if (!accountData.login || !accountData.password || !accountData.roles) {
    return res.status(400).send("Not created.");
  }

  let status;
  if (accountData.status == "closed") {
    status = "closed";
  } else {
    status = "open";
  }

  let password = await bcrypt.hashSync(accountData.password, 8);
  const newAccount = {
    login: accountData.login.toLowerCase(),
    password: password,
    roles: accountData.roles,
    status: status,
  };

  if (await accountService.isAccountExist(newAccount.login)) {
    return res.status(400).send("This account is already exist.");
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
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign({ login: user.login }, "secretkey", {
    expiresIn: "2h",
  });

  return res.status(200).send({
    accessToken: token,
    accessTokenExpiresAt: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 120000
    ).toISOString(),
    refreshToken: refreshToken,
    refreshTokenExpiresAt: new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 240000
    ).toISOString(),
  });
};

const validateToken = async (req, res) => {
  const token = req.params.accessToken;

  if (token == undefined) {
    return res.status(400).send("Token is not found.");
  }  

  try {
    const decodeToken = await jwt.verify(token, "secretkey");

    const expireTime = new Date(decodeToken.exp * 1000);
    expireTime.setHours(expireTime.getHours() + 1);

    res.status(200).send({
      token: token,
      expiresAt: expireTime
    });
  } catch(err) {
    res.status(400).send("Token has expired");
  }
};

module.exports = {
  register,
  login,
  validateToken,
};
