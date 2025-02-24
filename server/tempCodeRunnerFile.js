const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});


app.use(cors());
app.use(express.json());

app.post("/register", (req, res) =>{
    const {nome} = req.body;
    const {sobrenome} = req.body;
    const {dataDenascimento} = req.body;
    const {email} = req.body;
    const {senha} = req.body;

    let SQL = "INSERT INTO cadastro ( nome , sobrenome , dataDenascimento , email , senha ) VALUES (?,?,?,?,?)";
    db.query(SQL, [nome, sobrenome, dataDenascimento, email, senha], (err, result) => {
        console.log(err)
    })
})



app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
