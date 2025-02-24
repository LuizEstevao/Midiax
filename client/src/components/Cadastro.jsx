import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🔥 Importação corrigida





function Cadastro() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        nome: "",
        sobrenome: "",
        dataDeNascimento: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleChangeValues = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }));
    };

    const handleClickButton = async () => {
        if (values.senha !== values.confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        console.log("Enviando para o backend:", values);

        try {
            const response = await axios.post("http://localhost:3002/register", { // 🔥 axios em minúsculo
                nome: values.nome,
                sobrenome: values.sobrenome,
                dataDeNascimento: values.dataDeNascimento,
                email: values.email,
                senha: values.senha
            });

            console.log("Resposta do servidor:", response.data);
            alert("Cadastro realizado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro no cadastro! Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="container">
            <div className="cadastro">
                <h1>Cadastro</h1>
    
                <div className="forms">
                    <label className="nameInput">Primeiro Nome</label>
                    <input type="text" name="nome" onChange={handleChangeValues} />
                </div>

                <div className="forms">
                    <label className="nameInput">Sobrenome</label>
                    <input type="text" name="sobrenome" onChange={handleChangeValues} />
                </div>

                <div className="forms">
                    <label className="nameInput">Data de Nascimento</label>
                    <input type="date" name="dataDeNascimento" onChange={handleChangeValues} />
                </div>

                <div className="forms">
                    <label className="nameInput">Email</label>
                    <input type="email" name="email" onChange={handleChangeValues} />
                </div>

                <div className="forms">
                    <label className="nameInput">Senha</label>
                    <input type="password" name="senha" onChange={handleChangeValues} />
                </div>

                <div className="forms">
                    <label className="nameInput">Confirmar Senha</label>
                    <input type="password" name="confirmarSenha" onChange={handleChangeValues} />
                </div>

                <button className="registerButton" onClick={handleClickButton}>
                    Confirmar
                </button>
                <button className="linkForms" onClick={() => navigate("/login")}>Clique aqui para realizar seu Login</button>
            </div>
        </div>
    );
}

export default Cadastro;
