const express = require("express");
const app = express()
const cors = require("cors");

//middleware - backend can interact with frontend (cors)
app.use(express.json()) // request body
app.use(cors())

// ROUTES 

app.listen(5000, () => {
    console.log("server is running on port 5000");
});