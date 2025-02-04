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

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});