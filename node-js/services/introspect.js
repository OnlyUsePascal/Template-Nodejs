const session = require("express-session");

const introspect = {
  basic : (token) => {
    if (!token) return null;

    const [user, sessionId] = token.split(",");
    if (!user || !sessionId) return null;
    
    return {user, sessionId};
  }
}

module.exports = introspect;