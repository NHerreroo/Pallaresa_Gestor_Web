const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// CRUD Usuarios
app.post("/usuarios", async (req, res) => {
    const { correo, nombre, contraseña } = req.body;
    try {
        await pool.query("INSERT INTO personas (correo, nombre, contraseña) VALUES ($1, $2, $3)", [correo, nombre, contraseña]);
        res.status(201).send("Usuario creado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear usuario");
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM personas");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener usuarios");
    }
});

app.put("/usuarios/:correo", async (req, res) => {
    const { correo } = req.params;
    const { nombre, contraseña } = req.body;
    try {
        await pool.query("UPDATE personas SET nombre = $1, contraseña = $2 WHERE correo = $3", [nombre, contraseña, correo]);
        res.send("Usuario actualizado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al actualizar usuario");
    }
});

app.delete("/usuarios/:correo", async (req, res) => {
    const { correo } = req.params;
    try {
        await pool.query("DELETE FROM personas WHERE correo = $1", [correo]);
        res.send("Usuario eliminado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar usuario");
    }
});

// CRUD Roles
app.post("/roles", async (req, res) => {
    const { nombre } = req.body;
    try {
        await pool.query("INSERT INTO roles (nombre) VALUES ($1)", [nombre]);
        res.status(201).send("Rol creado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear rol");
    }
});

app.get("/roles", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roles");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener roles");
    }
});

app.delete("/roles/:nombre", async (req, res) => {
    const { nombre } = req.params;
    try {
        await pool.query("DELETE FROM roles WHERE nombre = $1", [nombre]);
        res.send("Rol eliminado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar rol");
    }
});

// CRUD Ficheros
app.post("/ficheros", async (req, res) => {
    const { enlace, nombre, carpeta } = req.body;
    try {
        await pool.query("INSERT INTO ficheros (enlace, nombre, carpeta) VALUES ($1, $2, $3)", [enlace, nombre, carpeta]);
        res.status(201).send("Fichero creado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al crear fichero");
    }
});

app.get("/ficheros", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM ficheros");
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener ficheros");
    }
});

app.delete("/ficheros/:nombre", async (req, res) => {
    const { nombre } = req.params;
    try {
        await pool.query("DELETE FROM ficheros WHERE nombre = $1", [nombre]);
        res.send("Fichero eliminado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al eliminar fichero");
    }
});

// Escuchar servidor
app.listen(4000, () => console.log("Servidor en 192.168.0.47, puerto 4000"));
