const jwt = require("jsonwebtoken");
const config = require('config');

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const jwtKey = config.get('JWT_KEY')
    const decoded = jwt.verify(token, "secret");
    // console.log("email" + decoded.email)
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token: " + token);
  }
  return next();
};

module.exports = verifyToken;
