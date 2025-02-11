const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const pool = require('./database');
const app = express();

app.use(cors());
app.use(express.json());

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { correo, nombre, contraseña, rol } = req.body;
  try {
    // Hash de la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    
    // Insertar en personas
    const resultPersona = await pool.query(
      'INSERT INTO personas (correo, nombre, contraseña) VALUES ($1, $2, $3) RETURNING *',
      [correo, nombre, hashedPassword]
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

// Una única ruta de login
app.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
      // Consulta modificada para ser más explícita
      const userQuery = `
          SELECT 
              p.correo,
              p.nombre,
              p."contraseña",  -- Notar las comillas dobles para el campo con ñ
              pr.nombre_rol 
          FROM personas p
          LEFT JOIN persona_rol pr ON p.correo = pr.correo_persona
          WHERE p.correo = $1
      `;
      
      // Log para depuración
      console.log('Intentando login con:', { correo, contraseñaLength: contraseña.length });

      const userResult = await pool.query(userQuery, [correo]);

      if (userResult.rowCount === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = userResult.rows[0];
      
      // Log para depuración
      console.log('Usuario encontrado:', {
          correo: user.correo,
          contraseñaAlmacenada: user.contraseña,
          contraseñaIngresada: contraseña,
          rol: user.nombre_rol
      });

      // Comparación directa de contraseñas
      if (user.contraseña !== contraseña) {
          return res.status(401).json({ 
              message: "Contraseña incorrecta",
              debug: {
                  contraseñaAlmacenada: user.contraseña,
                  contraseñaIngresada: contraseña
              }
          });
      }

      // Verifica el rol de administrador
      if (user.nombre_rol !== 'Administrador') {
          return res.status(403).json({ message: "Acceso denegado: No eres administrador" });
      }

      res.status(200).json({ 
          message: "Login exitoso",
          nombre: user.nombre,
          correo: user.correo
      });

  } catch (error) {
      console.error('Error completo:', error);
      res.status(500).json({ 
          message: "Error del servidor",
          error: error.message 
      });
  }
});

app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
});