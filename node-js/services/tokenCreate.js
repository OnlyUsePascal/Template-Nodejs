const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const tokenCreate = {
  basic: (user) => {
    return `${user},${crypto.randomUUID()}`;
  },

  mid: async (user) => {
    const { JWT_SECRET } = process.env;
    const payload = {
      user,
      sessionId: crypto.randomUUID(),
    };
    
    return new Promise((res, rej) => {
      jwt.sign(
        payload,
        JWT_SECRET,
        {
          algorithm: 'HS256', //hashing SHA-256
          expiresIn: "10m", // TODO: CONFLICT WITH SESSION TOKEN
        },
        (err, token) => {
          if (err) return rej(err);
          // console.log(`jwt: ${token}`);
          return res(token)
        }
      );
    })   
  },
};

module.exports = tokenCreate;
