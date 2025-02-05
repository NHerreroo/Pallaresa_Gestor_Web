const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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
    }

    res.status(201).json({ message: 'Usuario registrado', usuario: resultPersona.rows[0] });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ error: error.message });
  }
});


app.post("/login", async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Verifica si el usuario existe
        const userQuery = "SELECT * FROM personas WHERE correo = $1";
        const userResult = await pool.query(userQuery, [correo]);

        if (userResult.rowCount === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = userResult.rows[0];

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(contraseña, user.contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Verifica si el usuario tiene el rol de administrador
        const roleQuery = `
            SELECT * 
            FROM persona_rol 
            WHERE correo_persona = $1 AND nombre_rol = 'Administrador';
        `;
        const roleResult = await pool.query(roleQuery, [correo]);

        if (roleResult.rowCount === 0) {
            return res.status(403).json({ message: "Acceso denegado: No eres administrador" });
        }

        res.status(200).json({ message: "Login exitoso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
});



app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});