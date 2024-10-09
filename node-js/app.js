require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const indexRouter = require("./routers/indexRouter");
const expressSession = require("express-session");
const errController = require("./controllers/errorController");

const app = express();
const { PORT, API_PREFIX, COOKIE_SECRET } = process.env;
const corsWhiteList = [`http://localhost:${PORT}`];

// CORS
app.set("trust proxy", true);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (corsWhiteList.indexOf(origin) !== -1 || !origin)
        return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// cookie
app.use(
  expressSession({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 10, // 10 min
      priority: "medium",
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      // signed: false
    },
  })
);

// parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routing
app.use(`${API_PREFIX}`, indexRouter);
app.use(errController);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
