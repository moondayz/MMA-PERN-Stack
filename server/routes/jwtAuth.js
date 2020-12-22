const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../dbConnection");
//const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
//const authorize = require("../middleware/authorize");

// registering

router.post("/register", async (req, res) => {
  const {firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth } = req.body;

  try {
    // check if the user exist
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email
    ]); 
    
    //res.json(user.rows[0]);
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }
    //Bcrypt the password
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(passwordUser, salt);

    // insert the user into db
    // returning * - returns the data back to us 
    let newUser = await pool.query(
      "INSERT INTO users (firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [firstName, lastName, phoneNumber, email, bcryptPassword, maritalStatus, gender, placeOfBirth, dateOfBirth ]
    );
    
    // Generate the jwt
    const jwtToken = jwtGenerator(newUser.rows[0].idUser);

   res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login 


module.exports = router;