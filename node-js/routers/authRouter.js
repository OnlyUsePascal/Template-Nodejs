const express = require("express");
const authBasicController = require("../controllers/authBasicController");
const cookieHandler = require("../middlewares/cookieHandler");
const authMidController = require("../controllers/authMidController");
const authRouter = express.Router();

authRouter.post("/basic/login", authBasicController.login);
authRouter.get(
  "/basic/profile",
  cookieHandler.basic,
  authBasicController.profile
);
authRouter.post("/basic/logout", authBasicController.logout);


authRouter.post('/mid/login', authMidController.login);
authRouter.post('/mid/logout', authMidController.logout);
authRouter.get('/mid/profile', cookieHandler.mid, authMidController.profile);


authRouter.post("/register", (req, res, next) => {
  res.json({
    message: "Registered!",
  });
});
module.exports = authRouter;
