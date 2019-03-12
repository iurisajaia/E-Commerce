const jwt = require("jsonwebtoken");

// Import Config
const key = require("../config/keys").secretOrKey;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ error: "Access dennied, No token" });

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = auth;
