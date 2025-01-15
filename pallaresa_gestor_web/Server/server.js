const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/adduser", (req,res) =>{
    const email = req.body["email"]
    const username = req.body["username"]
    const password = req.body["password"]

    console.log("email:" + email);
    console.log("Username:" + username);
    console.log("Password:" + password);

    const insertSTMT = `INSERT INTO personas (correo, nombre, contraseña) VALUES ("${email}", "${username}", "${password}")`

    pool.query(insertSTMT).then((response) =>{
        console.log("Data Saved")
        console.log(response)
    })
    .catch((err) =>{
        console.log(err)
    })

    console.log(req.body);
    res.send("Response Received: " + req.body);
});

app.listen(4000, () => console.log("Server on 192.168.1.144"));


