const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/adduser", (req,res) =>{
    console.log(req,body)
    res.send("Response Received" + req.body);
});

app.listen(4000, () => console.log("Server on 192.168.1.144"))


 // Importa la conexión de la base de datos
