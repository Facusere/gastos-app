import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegistrarGasto from "./pages/RegistrarGasto";
import EditarGasto from "./pages/EditarGasto";
import Reporte from "./pages/Reporte";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registrar" element={<RegistrarGasto />} />
        <Route path="/editar/:id" element={<EditarGasto />} />
        <Route path="/reporte" element={<Reporte />} />
      </Routes>
    </Router>
  );
}

export default App;

