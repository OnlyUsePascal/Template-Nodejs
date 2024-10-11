const authenticate = require("../services/authenticate");
const tokenCreate = require("../services/tokenCreate");
/** @typedef {import("../controllers/index").reqHandler} reqHandler */

const authMidController = {
  /** @type {reqHandler} */
  login: async (req, res, next) => {
    const { username, pwd } = req.body;

    try {
      // validate
      if (!(await authenticate.mid(username, pwd)))
        throw new Error("Invalid credentials");

      // session token
      const token = await tokenCreate.mid(username);
      req.session.token = token;

      return res.json({
        message: "Logged in!",
      });
    } catch (err) {
      return next(err);
    }
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
