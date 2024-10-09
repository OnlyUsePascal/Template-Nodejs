const express = require("express");
const authenticate = require("../services/authenticate");

const authRouter = express.Router();

authRouter.post("/basic/login", (req, res, next) => {
  const { user, pwd } = req.body;
  if (!authenticate(user, pwd))
    return res.json({
      message: "hoorayyy!",
    });

  throw new Error("Invalid credentials");
});

authRouter.post("/basic/logout", (req, res, next) => {
  res.json({
    message: "Logged Out!",
  });
});

authRouter.post("/register", (req, res, next) => {
  res.json({
    message: "Registered!",
  });
});
module.exports = authRouter;
