const introspect = {
  basic: (token) => {
    if (!token) return null;

    const [user, sessionId] = token.split(",");
    if (!user || !sessionId) return null;

    return { user, sessionId };
  },

  mid: (token) => {
    if (!token) return null;

    const [user, sessionId] = token.split(",");
    if (!user || !sessionId) return null;

    return { user, sessionId };
  },
};

module.exports = introspect;
