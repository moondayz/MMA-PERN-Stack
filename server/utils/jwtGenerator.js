const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(idUser) {
  const payload = {
    user: idUser   
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "3h" });
}

module.exports = jwtGenerator;