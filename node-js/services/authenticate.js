const bcrypt = require("bcrypt");

const authenticate = {
  basic: async (user, pwd) => {
    const { TEST_USER, TEST_PWD } = process.env;
    // missing database + bcrypt
    if (user == TEST_USER && pwd == TEST_PWD) {
      return true;
    }

    return false;
  },

  mid: async (user, pwd) => {
    const { TEST_USER, TEST_PWD_HASH, SALT_ROUNDS } = process.env;
    // database

    // bcrypt 
    if (user == TEST_USER && bcrypt.compareSync(pwd, TEST_PWD_HASH)) {
      return true;
    }

    return false;
  },
};

module.exports = authenticate;
