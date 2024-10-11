const bcrypt = require("bcrypt");
const userRepo = require("../repositories/userRepo");

const authenticate = {
  basic: async (user, pwd) => {
    const { TEST_USER, TEST_PWD } = process.env;
    // missing database + bcrypt
    if (user == TEST_USER && pwd == TEST_PWD) {
      return true;
    }

    return false;
  },

  mid: async (username, pwd) => {
    const { TEST_USER, TEST_PWD_HASH } = process.env;
    // database
    const user = await userRepo.findOneByUserName(username);

    // bcrypt
    return bcrypt.compareSync(pwd, user.password);
  },
};

module.exports = authenticate;
