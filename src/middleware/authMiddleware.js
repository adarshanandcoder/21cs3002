const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
};

module.exports = authenticate;
