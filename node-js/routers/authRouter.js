const express = require("express");
const authenticate = require("../services/authenticate");
const session = require("express-session");
const introspect = require("../services/introspect");
const crypto = require("crypto");
const createToken = require("../services/createToken");
const authRouter = express.Router();

authRouter.post("/basic/login", async (req, res, next) => {
  const { user, pwd } = req.body;

  // validate
  if (!(await authenticate.basic(user, pwd)))
    return next(new Error("Invalid credentials"));

  // session token
  const token = createToken.basic(user);
  req.session.token = token;

  return res.json({
    message: "Logged in!",
  });
});

authRouter.get(
  "/basic/profile",
  (req, res, next) => {
    // introspect
    const { token } = req.session;
    const sessionInfo = introspect.basic(token);

    if (!sessionInfo) return next(new Error("Invalid cookie"));

    // chaining
    req.session.info = sessionInfo;
    return next();
  },
  (req, res, next) => {
    res.json({
      profile: req.session.info,
    });
  }
);

authRouter.post("/basic/logout", (req, res, next) => {
  req.session.destroy((err) => {
    return next(err);
  });

  return res.json({
    message: "Logged Out!",
  });
});

authRouter.post("/register", (req, res, next) => {
  res.json({
    message: "Registered!",
  });
});
module.exports = authRouter;
