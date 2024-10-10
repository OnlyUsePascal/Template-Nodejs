const introspect = require("../services/introspect");
/** @typedef {import("../controllers/index").reqHandler} reqHandler */

const cookieHandler = {
  /** @type {reqHandler} */
  basic: async (req, res, next) => {
    // introspect
    const { token } = req.session;
    const sessionInfo = introspect.basic(token);

    if (!sessionInfo) return next(new Error("Invalid cookie"));

    // chaining
    req.session.info = sessionInfo;
    return next();
  },

  /** @type {reqHandler} */
  mid: async (req, res, next) => {
    // introspect
    const { token } = req.session;
    const sessionInfo = introspect.basic(token);

    if (!sessionInfo) return next(new Error("Invalid cookie"));

    // chaining
    req.session.info = sessionInfo;
    return next();
  },
};

module.exports = cookieHandler;
