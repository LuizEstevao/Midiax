import Acesso from './components/Acesso.jsx';
import Cadastro from './components/Cadastro.jsx';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/acesso"
            element={<Acesso />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
