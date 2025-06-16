require('dotenv').config()

const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))

// Use this for testing
// app.use(cors())

// Use this before production
app.use(cors({
  origin: 'https://student-system-frontend-o4sd.onrender.com/'
}))

app.use(express.json())

const port = process.env.PORT || 5000

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1); // stop the server
  } else {
    console.log("Connected to MySQL database");
  }
});

app.post('/api/add_user', (req, res) => {
    const sql = "INSERT INTO student_details (name, email, gender, age) VALUES (?, ?, ?, ?)"
    const values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.age,
    ]

    db.query(sql, values, (err, result) => {
        if(err) return res.json({message: 'Something unexpected has occured' + err})
        return res.json({success: "Student added successfully!"})
    })
})

app.post("/api/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql =
      "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
    const values = [
      req.body.name,
      req.body.email,
      req.body.age,
      req.body.gender,
      id,
    ];
    
    db.query(sql, values, (err, result) => {
      if (err)
        return res.json({ message: "Something unexpected has occured" + err });
      return res.json({ success: "Student updated successfully" });
    });
  });


app.get('/api/students', (req, res) => {
    const sql = "SELECT * FROM student_details"
    db.query(sql, (err, result) => {
        if(err) res.json({ message: "Server error" })
        return res.json(result)
    })
})

app.get('/api/get_student/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM student_details WHERE `id` = ?"

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" })
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" })
        }
        return res.json(result)
    })
})

app.get('/api/search/:name', (req, res) => {
    const name = req.params.name
    const sql = "SELECT * FROM student_details WHERE `name` LIKE ?;"

    db.query(sql, [`%${name}%`], (err, result) => {
        if (err) return res.status(500).json({ message: "Server error" })
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" })
        }
        return res.json(result)
    })
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM student_details WHERE `id` = ?;"

    const values = [id]
      
    db.query(sql, values, (err, result) => {
    if (err)
        return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
    });
})

app.listen(port, () => {
    console.log("listening")
})