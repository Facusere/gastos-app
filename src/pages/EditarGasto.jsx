import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGastoById, updateGasto } from "../data/gastosService";
import GastoForm from "../components/GastoForm";

export default function EditarGasto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gasto, setGasto] = useState(null);

  useEffect(() => {
    const encontrado = getGastoById(id);
    if (!encontrado) {
      alert("Gasto no encontrado");
      navigate("/");
    } else {
      setGasto(encontrado);
    }
  }, [id, navigate]);

  const handleSubmit = (datosActualizados) => {
    updateGasto({ ...datosActualizados, id: Number(id) });
    alert("Gasto actualizado");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {gasto && <GastoForm onSubmit={handleSubmit} initialData={gasto} />}
    </div>
  );
}
