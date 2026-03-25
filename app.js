const Database = require("better-sqlite3");
const express = require("express");
const db = new Database("./productos.db")
const app = express();

db.exec(`CREATE TABLE IF NOT EXISTS productos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        stock INTEGER);
    `)

const count = db.prepare("SELECT COUNT(*) as total FROM productos;").get();

if(count.total === 0){
    const insert = db.prepare("INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)");
    insert.run("Teclado", 19999.9, 50)
    insert.run("Monitor", 199999.9, 25)
    insert.run("Mouse", 10000.0, 100)

}
app.get("/productos", (req,res)=>{
    const data = db.prepare("SELECT * FROM productos;").all();
    res.json(data);
})

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000/productos")
})