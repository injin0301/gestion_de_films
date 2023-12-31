const { Op } = require("sequelize");
const User = require("../models/user");

const getOneAccount = async (uid) => {
  let result;
  try {
    result = await User.findByPk(uid, {
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

const createAccount = async (newAccount) => {
  let savedAccount;
  try {
    savedAccount = await User.create(newAccount);
  } catch (error) {
    console.log(error);
  }
  return savedAccount;
};

const isAccountExist = async (login, uid) => {
  try {
    let alreadyExist = await User.findOne({
      where: {
        [Op.or]: [
          { login: login == undefined ? null : login },
          { uid: uid == undefined ? null : uid },
        ],
      },
    });
    if (alreadyExist) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

const updatedAccount = async (account, options) => {
  let updatedAccount;

  try {
    updatedAccount = await User.update(account, options);
  } catch (error) {
    console.log(error);
  }

  return updatedAccount;
};

const isAdmin = async (uid, login) => {
  try {
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { login: login == undefined ? null : login },
          { uid: uid == undefined ? null : uid },
        ],
      }
    });
    if (user.roles == "ROLE_ADMIN") {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

const getOneAccountByLogin = async (login) => {
  let result;
  try {
    result = await User.findOne({
      where : {
        login: login
      }
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = {
  getOneAccount,
  createAccount,
  isAccountExist,
  updatedAccount,
  isAdmin,
  getOneAccountByLogin
};
