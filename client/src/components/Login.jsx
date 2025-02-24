import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importação do Axios
import { ArrowLeft } from "lucide-react"; // Ícone de seta

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post("http://localhost:3002/login", { email, senha }) // URL corrigida
            .then((response) => {
                console.log(response.data.message);
                if (response.status === 200) {
                    navigate("/Acesso");
                }
            })
            .catch((error) => {
                console.error("Erro no login:", error.response ? error.response.data : error.message);
                alert("Erro ao fazer login. Verifique as credenciais e tente novamente.");
            });
    };

    return (
        <div className="container">
            

            <div className="cadastro">
            
                <h1 style={{ marginTop: "3rem" }}>Entrar</h1>
                <button className="backButton" onClick={() => navigate("/landingPage")} >
                <ArrowLeft size={24} />
                Voltar
            </button>

                <div className="forms" style={{ margin: "auto" }}>
                    <label className="nameInput">Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="forms">
                    <label className="nameInput">Senha</label>
                    <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

                <button className="registerButton" onClick={handleLogin}>
                    Confirmar
                </button>
                <button className="linkForms" onClick={() => navigate("/cadastro")}>
                    Clique aqui para realizar seu cadastro
                </button>
            </div>
        </div>
    );
};

export default Login;
