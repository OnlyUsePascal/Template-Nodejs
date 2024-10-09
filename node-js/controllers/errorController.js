const { StatusCodes } = require("http-status-codes");

const errController = (err, req, res, next) => {
  console.dir(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
    error: err.message,
  });
};

module.exports = errController;
