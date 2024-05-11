const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ankeet@1928",
    database:"crud_app"
});

app.get("/",(req,res)=>{
    res.json("Hello from Backend Dev!");
});

app.get("/books",(req,res)=>{
    const q = "select * from books";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post("/books",(req,res)=>{
    const q = "insert into books(`title`,`description`,`cover`,`price`) values (?)";
    const values = [
       // req.body.id,
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ];

    db.query(q,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json("Book has been created Successfully.");
    });

});

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted Successfully.");
    });

});

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = " UPDATE books SET `title` = ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ? ";

    const values = [
        req.body.title,
        req.body.description,
        req.body.cover,
        req.body.price
    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been Updated Successfully.");
    })

});

app.listen(8000,()=>{
    console.log("Connected to Backend!")
})