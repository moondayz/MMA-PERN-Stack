const express = require("express");
const app = express()
const cors = require("cors");

//middleware - backend can interact with frontend (cors)
app.use(cors());
app.use(express.json()) // request body


// ROUTES  - for register and login

app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server is running on port 5000");
});