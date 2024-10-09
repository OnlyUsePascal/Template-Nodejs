const introspect = require("../services/introspect");

const cookieHandler = {
  basic: (req, res, next) => {
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
