const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();


app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "style-src 'self' 'unsafe-inline' https://www.gstatic.com;");
  next();
});


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { nome, sobrenome, dataDeNascimento, email, senha } = req.body;

  console.log("Recebendo do frontend:", req.body);

  // Verifica se os campos não estão vazios
  if (!nome || !sobrenome || !dataDeNascimento || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }

  const SQL =
    "INSERT INTO cadastro (nome, sobrenome, dataDeNascimento, email, senha) VALUES (?, ?, ?, ?, ?)";

  db.query(
    SQL,
    [nome, sobrenome, dataDeNascimento, email, senha],
    (err, result) => {
      if (err) {
        console.error("Erro ao inserir no banco:", err);
        return res.status(500).json({ error: "Erro ao cadastrar usuário." });
      }
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    }
  );
});

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002 🚀");
});

// ----------------------------------------------------------------------/LOGIN/---------------------------------------------------------------------------------------------------------------------------

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const SQL = "SELECT * FROM cadastro WHERE email = ? AND senha = ?";
  db.query(SQL, [email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao consultar no banco:", err);
      return res.status(500).json({ error: "Erro ao fazer login." });
    } else {
      if (result.length > 0) {
        return res
          .status(200)
          .json({ message: "Login realizado com sucesso!" });
      } else {
        return res.status(401).json({ error: "Email ou senha inválidos!" });
      }
    }
  });
});
