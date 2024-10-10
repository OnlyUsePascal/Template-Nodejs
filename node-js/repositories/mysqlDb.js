const mysql = require("mysql2/promise");

const {
  DB_USER_ROOT,
  DB_USER_ROOT_PWD,
  DB_NAME,
  DB_HOST,
  DB_CONNECTION_LIMIT,
} = process.env;

const poolRoot = mysql.createPool({
  host: DB_HOST,
  user: DB_USER_ROOT,
  password: DB_USER_ROOT_PWD,
  database: DB_NAME,
  connectionLimit: Number(DB_CONNECTION_LIMIT),
  waitForConnections: true,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const mysqlDb = {
  init: async () => {
    poolRoot
      .query(`select 1`)
      .then(([rows, fields]) => {
        console.log("Mysql pool root connected!");
      })
      .catch((err) => {
        console.log("Mysql pool root failed to connect!");
        console.dir(err);
      });
  },

  getPool: async () => {},
};

module.exports = mysqlDb;
