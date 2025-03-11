const  {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "movie",
    password: "30ocT2001@"
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}