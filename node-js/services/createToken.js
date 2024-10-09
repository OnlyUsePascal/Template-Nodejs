const crypto = require("crypto");

const createToken = {
  basic: (user) => {
    return `${user},${crypto.randomUUID()}`;
  },
};

module.exports = createToken;