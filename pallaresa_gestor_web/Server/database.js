const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres", 
    password: "usuario",
<<<<<<< Updated upstream
    host: "192.168.0.47", //cabmiar por la de cada uno en local
=======
    host: "192.168.0.47", // Cambiar por la de cada uno en local
>>>>>>> Stashed changes
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