const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../dbConnection");
const validation = require("../middleware/validation");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

// registering

router.post("/register", validation, async (req, res) => {
  const { firstName, lastName, phoneNumber, email, passwordUser, maritalStatus, gender, placeOfBirth, dateOfBirth } = req.body;

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
      [firstName, lastName, phoneNumber, email, bcryptPassword, maritalStatus, gender, placeOfBirth, dateOfBirth]
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

router.post("/login", async (req, res) => {
  // Destructure the request body
  const { email, password } = req.body;

  try {
    console.log(email);
    // check if user doesnt exist

    const user = await pool.query(`SELECT * FROM users where email = '${email}' `);
   // const hash = await pool.query(`SELECT passwordUser FROM users where email = '${email}' `);

    console.log(user.rows.length);
    //if user doesnt exist 
    if (user.rows.length === 0) {
      //401 - unauthenticated 
      console.log(user.rows.length)
      return res.status(401).json("Incorrect credentials - User doesnt exist");
    }

  //  const hashed = hash.rows[0].passworduser
    // check if the req password is equals to the one in db
    const validPassword = await bcrypt.compare(password, user.rows[0].passworduser);

    console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json("Password is incorrect");
    }

    // generate the jwt if all ok
    const jwtToken = jwtGenerator(user.rows[0].idUser);
    return res.json({ jwtToken });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// It verifies the token when ever the application is refreshed.  - authorization
router.get("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    //console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;