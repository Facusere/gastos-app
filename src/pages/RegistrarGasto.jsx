import GastoForm from "../components/GastoForm";
import { addGasto } from "../data/gastosService";
import { useNavigate } from "react-router-dom";

export default function RegistrarGasto() {
  const navigate = useNavigate();

  const handleSubmit = (nuevoGasto) => {
    addGasto(nuevoGasto);
    alert("Gasto registrado con éxito.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <GastoForm onSubmit={handleSubmit} />
    </div>
  );
}
