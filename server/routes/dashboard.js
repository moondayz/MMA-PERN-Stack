const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../dbConnection");

module.exports = router;

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT firstname FROM users WHERE idUser = $1",
      [req.user.iduser] 
    ); 
    
    res.json(user.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
