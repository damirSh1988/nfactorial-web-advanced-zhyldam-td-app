import express from "express";
import mysql from "mysql";
import cors from "cors";


const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"12345",
    database:"db"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.json("hello this is the backenrrrd")
})

app.get("/items", (req, res)=>{
    const q = "SELECT * FROM items"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
       
    })
    
}) 

app.post("/items", (req, res)=>{
    const q = "INSERT INTO  items (`description`, `code`, `count`, `brutto`, `summa`, `usd`, `pk`, `container`) VALUES (?)";

    const values = [
        req.body.description,
        req.body.code,
        req.body.count,
        req.body.brutto,
        req.body.summa,
        req.body.usd,
        req.body.pk,
        req.body.container
    ]
  console.log("back")
    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend")
})