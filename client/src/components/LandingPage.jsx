import React, { useEffect, useRef } from 'react';
import logo from "/public/midiax.png";
import anix from "/public/anix.png";
import { useNavigate } from 'react-router-dom';
import "./landingPage.css"


const items = [
    { img: "/crescimento.png", text: "Crescimento" },
    { img: "/Conexões 1.png", text: "Conexão" },
    { img: "/Engajamento 1.png", text: "Engajamento" },
    { img: "/Estrategia 1.png", text: "Estratégia" },
    { img: "/identidade.png", text: "Identidade" },
    { img: "/alcance.png", text: "Alcance" },
    { img: "/comunicação.png", text: "Comunicação" },
    { img: "/presença 1.png", text: "Presença" },
];




const LandingPage = () => {
    const navigate = useNavigate();
    const gridItems = useRef(null);

    useEffect(() => {
        if (!gridItems.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('apareceu');
                }
            });
        }, {
            rootMargin: '50px',
        });

        const itemsList = gridItems.current.children;
        Array.from(itemsList).forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landingPage">
            <nav className="navBar">
                <div className="logo">
                    <img src={logo} alt="Logo Anax Social Media" />
                </div>
                
                <div className="navBarButtons">
                    <button className="btnRegister" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
                    <button className="btnLogin" onClick={() => navigate("/login")}>Entrar</button>
                </div>
            </nav>

            <div className="triangleDetail"></div>
            <header className="title">
                <h1>O que é um Social Media?</h1>
            </header>

            <div className="SectionOne">
                <h2>
                    Um Social Media gerencia a presença digital da sua marca, criando estratégias para engajar seu público e fortalecer sua identidade online.
                    Na nossa plataforma, ele desenvolve conteúdos impactantes, interage com seguidores e analisa métricas para otimizar cada publicação.
                    Com criatividade e foco em resultados, ele transforma redes sociais em poderosos canais de conexão e crescimento.
                </h2>

                <div className="imgAnix">
                    <div className="anix">
                        <img src={anix} alt="Imagem da Anix, jovem mulher de cabelos longos e cacheados." />
                    </div>
                    <div className="helloAna">
                        <p>Olá, <br /> eu me chamo Anix</p>
                    </div>
                </div>
            </div>

            <div className="triangleDetail2"></div>

            <section>
                <h1>Por que é importante ter um Social Media?</h1>

                <div className="importance" ref={gridItems}>
                    {items.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <img src={item.img} alt={item.text} />
                            <h2>{item.text}</h2>
                        </div>
                    ))}
                </div>
            </section>

            <div className="triangleDetail"></div>

            <h1>Incrível, não é?</h1>
            <h2>
                Com um Social Media, sua marca se destaca, engaja o público certo e cresce no digital.
                Fale conosco e leve sua presença online para o próximo nível!
            </h2>

            <div className="SectionFinal">
                <h3>
                    Cadastre seus dados para que possamos,construir uma parceria incrível. <br />
                    Nosso WhatsApp está à disposição para esclarecer <br /> quaisquer dúvidas.
                </h3>
                <button type='submit' onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
            </div>
        </div>
    );
};

export default LandingPage;
