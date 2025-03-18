const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres", 
    password: "usuario",

    //host: "192.168.1.47", //Joel
    host: "192.168.0.47", //Nacho
    //host:"192.168.1.144", //Ben
    port: 5432,
    database: "pallaresa"
});

pool.connect()
    .then(client => {
        console.log("Conexión exitosa a la base de datos");
        client.release(); // Libera el cliente para que pueda ser reutilizado
    })
    .catch(err => console.error("Error al conectar con la base de datos", err));

module.exports = pool;