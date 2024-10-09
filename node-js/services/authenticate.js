const authenticate = async (user, pwd) => {
  const { TEST_USER, TEST_PWD } = process.env;

  // missing database + bcrypt
  if (user === TEST_USER && pwd === TEST_PWD) {
    return true;
  }

  return false;
};

module.exports = authenticate;
