
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Page/Home/Home";
import Detalhes from "./Components/Detalhes/Detalhes";
import Login from "./Page/Login/Login"
import Cadastro from "./Page/Cadastro/Cadastro";
import CadastroFinalizado from "./Page/Cadastro/CadastroFinalizado";  
import NaoImplementado from "./Page/NaoImplementado/NaoImplementado";
import AuthProvider from "./Context/AuthProvider.jsx";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrofinalizado" element={<CadastroFinalizado />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/nao-implementado" element={<NaoImplementado />} />
          </Route>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;