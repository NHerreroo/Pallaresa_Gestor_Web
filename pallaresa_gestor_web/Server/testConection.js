const pool = require('./database');

(async () => {
    try {
        // Probar la conexión
        const result = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa:', result.rows[0]);

        // Insertar una nueva persona
        const correo = 'nuevo_usuario@correo.com';
        const nombre = 'Nuevo Usuario';
        const contraseña = '123456'; // Contraseña sin cifrar para pruebas
        const query = 'INSERT INTO personas (correo, nombre, contraseña) VALUES ($1, $2, $3) RETURNING *';
        const valores = [correo, nombre, contraseña];

        const insertResult = await pool.query(query, valores);
        console.log('Persona añadida:', insertResult.rows[0]);
    } catch (error) {
        console.error('Error en la conexión o inserción:', error);
    } finally {
        // Cerrar la conexión
        pool.end();
    }
})();
