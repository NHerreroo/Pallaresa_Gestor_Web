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


// Ruta para obtener todos los usuarios con su rol
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        p.correo, 
        p.nombre, 
        COALESCE(pr.nombre_rol, 'DOCENTE') AS rol
      FROM personas p
      LEFT JOIN persona_rol pr ON p.correo = pr.correo_persona
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});







// Una única ruta de login
app.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
      const userQuery = `
          SELECT 
              p.correo,
              p.nombre,
              p."contraseña",
              pr.nombre_rol 
          FROM personas p
          LEFT JOIN persona_rol pr ON p.correo = pr.correo_persona
          WHERE p.correo = $1
      `;

      const userResult = await pool.query(userQuery, [correo]);

      if (userResult.rowCount === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = userResult.rows[0];

      // Verifica la contraseña usando bcrypt.compare()
      const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!passwordMatch) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Verifica si el usuario es administrador
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
      res.status(500).json({ message: "Error del servidor", error: error.message });
  }
});






app.post("/docente", async (req, res) => {
  const { correo, contraseña } = req.body;
  console.log("Intento de login:", correo);

  try {
      const userQuery = `
          SELECT 
              p.correo,
              p.nombre,
              p."contraseña"
          FROM personas p
          WHERE p.correo = $1
      `;

      const userResult = await pool.query(userQuery, [correo]);
      console.log("Resultado de consulta:", userResult.rows);

      if (userResult.rowCount === 0) {
          console.log("Usuario no encontrado");
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = userResult.rows[0];

      console.log("Contraseña ingresada:", contraseña);
      console.log("Contraseña en BD:", user.contraseña);

      // Comparar contraseña encriptada
      const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
      console.log("Coinciden las contraseñas?", passwordMatch);

      if (!passwordMatch) {
          console.log("Contraseña incorrecta");
          return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      console.log("Login exitoso");
      res.status(200).json({ 
          message: "Login exitoso",
          nombre: user.nombre,
          correo: user.correo
      });

  } catch (error) {
      console.error('Error completo:', error);
      res.status(500).json({ message: "Error del servidor", error: error.message });
  }
});



app.get("/docente/folder", async (req, res) => {
  const { correo } = req.query; // Se recibe el correo del usuario logueado

  if (!correo) {
    return res.status(400).json({ error: "Correo de usuario requerido" });
  }

  try {
    const query = `
      SELECT ficheros.*
      FROM ficheros
      JOIN rol_fichero ON ficheros.nombre = rol_fichero.nombre_Fichero
      JOIN persona_rol ON rol_fichero.nombre_Rol = persona_rol.nombre_Rol
      WHERE persona_rol.correo_Persona = $1;
    `;
    const result = await pool.query(query, [correo]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al obtener los ficheros:", error);
    res.status(500).json({ error: error.message });
  }
});


//select roles
app.get("/api/roles", async (req, res) => {
  try {
    const result = await pool.query("SELECT nombre FROM roles");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error obteniendo los roles");
  }
});

//isert ficheros
app.post("/api/ficheros", async (req, res) => {
  const { nombre, enlace, carpeta, roles } = req.body;

  // Validar que los campos obligatorios no estén vacíos
  if (!nombre || !enlace || !roles || roles.length === 0) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Insertar el fichero
    await pool.query(
      "INSERT INTO ficheros (nombre, enlace, carpeta) VALUES ($1, $2, $3)",
      [nombre, enlace, carpeta]
    );

    // Asignar el fichero a cada rol en la tabla rol_fichero
    for (const rol of roles) {
      await pool.query(
        "INSERT INTO rol_fichero (nombre_Rol, nombre_Fichero) VALUES ($1, $2)",
        [rol, nombre]
      );
    }

    res.status(201).json({ message: "Fichero insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar fichero:", error);
    res.status(500).json({ error: error.message });
  }
});

//todos los roles
app.get('/roles', async (req, res) => {
  try {
      const result = await pool.query('SELECT nombre FROM roles');
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Error al obtener los roles');
  }
});


// Ruta para insertar un nuevo rol
app.post("/api/roles", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El nombre del rol es obligatorio" });
  }

  try {
    // Insertar el nuevo rol en la base de datos
    await pool.query("INSERT INTO roles (nombre) VALUES ($1)", [nombre]);
    res.status(201).json({ message: "Rol insertado correctamente" });
  } catch (error) {
    console.error("Error al insertar rol:", error);
    res.status(500).json({ error: error.message });
  }
});




app.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
});