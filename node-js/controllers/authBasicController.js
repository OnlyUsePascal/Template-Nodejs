const authenticate = require("../services/authenticate");
const tokenCreate = require("../services/tokenCreate");

const authBasicController = {
  login: async (req, res, next) => {
    const { user, pwd } = req.body;

    // validate
    if (!(await authenticate.basic(user, pwd)))
      return next(new Error("Invalid credentials"));

    // session token
    const token = tokenCreate.basic(user);
    req.session.token = token;

    return res.json({
      message: "Logged in!",
    });
  },

  profile: (req, res, next) => {
    res.json({
      profile: req.session.info,
    });
  },

  logout: (req, res, next) => {
    req.session.destroy((err) => {
      return next(err);
    });

    return res.json({
      message: "Logged Out!",
    });
  },
};

module.exports = authBasicController