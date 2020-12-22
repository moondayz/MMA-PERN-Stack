const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1111",
  port: 5432,
  database: "mmaperndb"
});

module.exports = pool;

// all crud will be coming from this pool