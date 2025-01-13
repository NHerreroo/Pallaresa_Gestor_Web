const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres", 
    password: "usuario",
    host: "192.168.1.144",
    port: 5432
})

