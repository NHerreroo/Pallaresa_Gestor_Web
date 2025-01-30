const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

<<<<<<< Updated upstream

// Autenticar usuario y verificar rol de administrador
app.post("/login", async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const userQuery = `
            SELECT p.nombre, pr.nombre_rol 
            FROM personas p
            JOIN persona_rol pr ON p.correo = pr.correo_persona
            WHERE p.correo = $1 AND p.contraseña = $2 AND pr.nombre_rol = 'Administrador'
        `;
        const result = await pool.query(userQuery, [correo, contraseña]);

        if (result.rows.length > 0) {
            res.status(200).json({ success: true, nombre: result.rows[0].nombre });
        } else {
            res.status(401).json({ success: false, message: "Credenciales incorrectas o no tiene rol de administrador" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al iniciar sesión");
    }
});



// CRUD Usuarios
app.post("/usuarios", async (req, res) => {
    const { correo, nombre, contraseña } = req.body;
    try {
        await pool.query("INSERT INTO personas (correo, nombre, contraseña) VALUES ($1, $2, $3)", [correo, nombre, contraseña]);
        res.status(201).send("Usuario creado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear usuario");
=======
app.post('/api/register', async (req, res) => {
  const { correo, nombre, contraseña, rol } = req.body;
  try {
    // Insertar en personas
    const resultPersona = await pool.query(
      'INSERT INTO personas (correo, nombre, contraseña) VALUES ($1, $2, $3) RETURNING *',
      [correo, nombre, contraseña]
    );

    // Insertar en persona_rol (si el rol existe)
    if (rol) {
      await pool.query(
        'INSERT INTO persona_rol (correo_Persona, nombre_Rol) VALUES ($1, $2)',
        [correo, rol]
      );
>>>>>>> Stashed changes
    }

    res.status(201).json({ message: 'Usuario registrado', usuario: resultPersona.rows[0] });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});