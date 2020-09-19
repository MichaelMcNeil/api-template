const jwt = require("jsonwebtoken");
const config = require("config");

sign = (obj) => {
  ["password"].forEach((field) => delete obj[field]);
  return jwt.sign(obj, config.get("jwtKey"));
};

module.exports = { sign };
