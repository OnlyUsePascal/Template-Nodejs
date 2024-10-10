const authenticate = require("../services/authenticate");
const createToken = require("../services/createToken");
/** @typedef {import("../controllers/index").reqHandler} reqHandler */

const authMidController = {
  /** @type {reqHandler} */
  login: async (req, res, next) => {
    const { user, pwd } = req.body;

    // validate
    if (!(await authenticate.mid(user, pwd)))
      return next(new Error("Invalid credentials"));

    // session token
    const token = createToken.basic(user);
    req.session.token = token;

    return res.json({
      message: "Logged in!",
    });
  },

  /** @type {reqHandler} */
  profile: async (req, res, next) => {
    res.json({
      profile: req.session.info,
    });
  },

  /** @type {reqHandler} */
  logout: async (req, res, next) => {
    req.session.destroy((err) => {
      return next(err);
    });

    return res.json({
      message: "Logged Out!",
    });
  },
};

module.exports = authMidController;
