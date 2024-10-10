const tokenIntrospect = require("../services/tokenIntrospect");
/** @typedef {import("../controllers/index").reqHandler} reqHandler */

const cookieHandler = {
  /** @type {reqHandler} */
  basic: async (req, res, next) => {
    // introspect
    const { token } = req.session;
    const sessionInfo = tokenIntrospect.basic(token);

    if (!sessionInfo) return next(new Error("Invalid cookie"));

    // chaining
    req.session.info = sessionInfo;
    return next();
  },

  /** @type {reqHandler} */
  mid: async (req, res, next) => {
    // introspect
    const { token } = req.session;

    try {
      const sessionInfo = await tokenIntrospect.mid(token);
      if (!sessionInfo) throw new Error('Invalid Cookie');
      // chaining
      req.session.info = sessionInfo;
      return next();
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = cookieHandler;
