
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Page/Home/Home";
import Detalhes from "./Components/Detalhes/Detalhes";
import Cadastro from "./Page/Cadastro/Cadastro";
import CadastroFinalizado from "./Page/Cadastro/CadastroFinalizado";  


const App = () => {
  return (
    <Router>
      
        <Routes>
          {}
          
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrofinalizado" element={<CadastroFinalizado />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Route>
          <Route path="/cadastro" element={<Cadastro />} />
          
          
        </Routes>
    </Router>
  );
};

export default App;