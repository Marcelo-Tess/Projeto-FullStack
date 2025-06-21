
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Page/Home/Home";
import Detalhes from "./Components/Detalhes/Detalhes";


const App = () => {
  return (
    <Router>
        <Routes>
          {/* Layout público - Navbar pública */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
         
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;