require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");

const app = express();
const PORT = process.env.PORT;
const corsWhiteList = [`http://localhost:${PORT}`];

// request headers
app.set("trust proxy", true);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (corsWhiteList.indexOf(origin) !== -1 || !origin) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials : true
  })
);

// request body
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// run server
app.get("/", (req, res, next) => {
  res.status(StatusCodes.OK).json({
    message: "Hello, world!",
  });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})


