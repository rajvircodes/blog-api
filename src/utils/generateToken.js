const jwt = require("jsonwebtoken");

const token = jwt.sign(
  process.env.JWT_SECRET,
  { id: user._id },
  {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
);

module.exports = jwt;
