const accountService = require("../services/accountService");

const getAccountByUid = async (req, res) => {
  const {
    params: { uid },
  } = req;
  if (!uid) {
    return res.status(400).send("UID not found.");
  }

  try {
    const account = await accountService.getOneAccount(uid);

    if (!account) {
      return res.status(404).json({
        success: false,
        error: { code: 404, message: "No matching account found." },
      });
    }
    return res.status(200).send(account);
  } catch (err) {
    console.error("Failed to retrieve data : ", err);
  }
};

const UpdateAccountByUid = async (req, res) => {
  let account;
  if (!(await accountService.isAdmin(req.params.uid))) {
    account = { login: req.body.login, password: req.body.password };
  } else {
    account = req.body;
  }

  const options = {
    where: { uid: req.params.uid },
  };

  if (await accountService.isAccountExist(null, req.params.uid)) {
    const updatedAccount = await accountService.updatedAccount(
      account,
      options
    );

    if (!updatedAccount) {
      return res.status(400).send("Not updated.");
    }

    return res.status(200).send("Updated successfully.");
  } else {
    return res.status(400).send("ID is not exist.");
  }
};

module.exports = {
  getAccountByUid,
  UpdateAccountByUid,
};
