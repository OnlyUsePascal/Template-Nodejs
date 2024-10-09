const express = require("express");
const { StatusCodes } = require("http-status-codes");
const authRouter = require("./authRouter");

const indexRouter = express.Router();

indexRouter.get("/testing", (req, res, next) => {
  res.status(StatusCodes.OK).json({
    message: "Hello, world!",
  });
});

indexRouter.use('/auth', authRouter);

module.exports = indexRouter;