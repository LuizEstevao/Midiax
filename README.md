# Midiax - Plataforma Social Media

## Descrição do Projeto
Midiax é uma plataforma que tem como objetivo explicar por que é importante ter um social media nos seus serviços e o que exatamente faz um social media. Para acessar a plataforma, é necessário se cadastrar, garantindo uma experiência personalizada.

## Tecnologias Utilizadas
- **Frontend:** React.js (useState, Axios)
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL
- **Gerenciador de Pacotes:** npm
- **Ferramentas Extras:** Cors, Nodemon

---

## Estrutura do Projeto

### 1. **Frontend (React.js)**
O frontend é responsável por coletar as informações do usuário e enviá-las ao backend via requisições HTTP (POST).

- **useState:** Hook do React usado para armazenar e atualizar os valores digitados pelo usuário nos campos de input.
- **Axios:** Biblioteca para realizar chamadas HTTP ao backend.
- **Eventos:** `onChange` captura os dados do formulário e `onClick` envia os dados para o backend.

**Exemplo de código:**
```jsx
import React, { useState } from 'react';
import Axios from 'axios';

function Cadastro() {
    const [values, setValues] = useState({});

    const handleChangeValues = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickButton = () => {
        Axios.post("http://localhost:3002/register", values)
            .then((response) => {
                console.log("Cadastro realizado com sucesso!", response);
            })
            .catch((error) => {
                console.error("Erro ao enviar os dados:", error);
            });
    };

    return (
        <div>
            <input type="text" name="nome" onChange={handleChangeValues} />
            <input type="email" name="email" onChange={handleChangeValues} />
            <input type="password" name="senha" onChange={handleChangeValues} />
            <button onClick={handleClickButton}>Cadastrar</button>
        </div>
    );
}
export default Cadastro;
```

---

### 2. **Backend (Node.js com Express)**
O backend recebe os dados do frontend, processa a requisição e insere os valores no banco de dados MySQL.

- **Express:** Framework para criar rotas HTTP.
- **MySQL:** Banco de dados onde os dados serão armazenados.
- **Cors:** Middleware que permite a comunicação entre frontend e backend.
- **Nodemon:** Ferramenta que reinicia automaticamente o servidor ao detectar alterações no código.
- **createPool:** Cria uma conexão com o banco de dados MySQL, permitindo várias consultas simultâneas.

**Exemplo de código:**
```js
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { nome, email, senha } = req.body;
    const SQL = "INSERT INTO cadastro (nome, email, senha) VALUES (?, ?, ?)";
    
    db.query(SQL, [nome, email, senha], (err, result) => {
        if (err) {
            console.error("Erro ao inserir dados:", err);
            res.status(500).json({ message: "Erro no servidor" });
        } else {
            res.status(201).json({ message: "Cadastro realizado com sucesso!" });
        }
    });
});

app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});
```

---

### 3. **Banco de Dados (MySQL)**
A tabela `cadastro` armazena os dados dos usuários cadastrados.

**Criação da tabela:**
```sql
CREATE DATABASE crud;
USE crud;
CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);
```

---

## **Status HTTP Utilizados**
- **200 - OK:** A requisição foi bem-sucedida.
- **201 - Created:** Recurso criado com sucesso no banco de dados.
- **400 - Bad Request:** Dados inválidos enviados pelo cliente.
- **404 - Not Found:** Rota ou recurso não encontrado.
- **500 - Internal Server Error:** Erro interno no servidor.

---

## **Como Rodar o Projeto**

### 1️⃣ **Instalar Dependências**
No backend, execute:
```sh
npm install express mysql cors nodemon
```
No frontend, execute:
```sh
npm install axios
```

### 2️⃣ **Iniciar o Backend**
```sh
nodemon server.js
```

### 3️⃣ **Iniciar o Frontend**
```sh
npm start
```

O projeto estará rodando em **http://localhost:3000/** e o backend em **http://localhost:3002/**.

---

## **Melhorias Futuras**
✅ Implementar criptografia de senha com `bcrypt`.
✅ Criar uma tela de login que verifica email e senha antes de conceder acesso.
✅ Utilizar `jsonwebtoken (JWT)` para autenticação segura.
✅ Adicionar validação de formulário com `Yup` ou `Zod`.

---

## **Conclusão**
O **Midiax** é um projeto inovador que visa educar os usuários sobre a importância de um social media nos negócios. Com um sistema de cadastro seguro e eficiente, ele oferece uma base sólida para explorar estratégias digitais e compreender melhor o papel do social media no crescimento de marcas e serviços.


