const express = require("express");
const authBasicController = require("../controllers/AuthBasicController");
const cookieHandler = require("../middlewares/cookieHandler");
const authRouter = express.Router();

authRouter.post("/basic/login", authBasicController.login);

authRouter.get(
  "/basic/profile",
  cookieHandler.basic,
  authBasicController.profile
);

authRouter.post("/basic/logout", authBasicController.logout);

authRouter.post("/register", (req, res, next) => {
  res.json({
    message: "Registered!",
  });
});
module.exports = authRouter;
