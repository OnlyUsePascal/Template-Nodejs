const jwt = require("jsonwebtoken");

const introspect = {
  basic: (token) => {
    if (!token) return null;

    const [user, sessionId] = token.split(",");
    if (!user || !sessionId) return null;

    return { user, sessionId };
  },

  mid: (token) => {
    if (!token) throw new Error('Empty session token');
    const { JWT_SECRET } = process.env;

    return new Promise((res, rej) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return rej(err);
        return res(decoded);
      });
    });
  },
};

module.exports = introspect;
