import { useEffect, useState } from "react";
import { getGastos, saveGastos } from "../data/gastosService";
import GastoList from "../components/GastoList";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [gastos, setGastos] = useState([]);
  const [totalMes, setTotalMes] = useState(0);
  const [datosGrafico, setDatosGrafico] = useState([]);

  useEffect(() => {
    const datos = getGastos();
    setGastos(datos);

    const mesActual = new Date().toISOString().slice(0, 7);
    const gastosDelMes = datos.filter((g) => g.fecha.startsWith(mesActual));

    // Calcular total del mes
    const total = gastosDelMes.reduce((sum, g) => sum + Number(g.monto), 0);
    setTotalMes(total);

    // Agrupar por categoría
    const agrupados = {};
    gastosDelMes.forEach((g) => {
      agrupados[g.categoria] = (agrupados[g.categoria] || 0) + Number(g.monto);
    });

    // Convertir a array para Recharts
    const formatoGrafico = Object.entries(agrupados).map(([categoria, monto]) => ({
      categoria,
      monto,
    }));

    setDatosGrafico(formatoGrafico);
  }, []);

  const handleDelete = (id) => {
    if (confirm("¿Eliminar gasto?")) {
      const nuevos = gastos.filter((g) => g.id !== id);
      setGastos(nuevos);
      saveGastos(nuevos);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Panel de Control</h1>

      {/* Tarjeta de resumen */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center mb-6 border">
        <p className="text-lg">Total del mes actual:</p>
        <p className="text-3xl font-bold text-green-600">${totalMes}</p>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4 mb-8">
        <Link to="/registrar">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow">
            Registrar Gasto
          </button>
        </Link>
        <Link to="/reporte">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow">
            Ver Reporte Mensual
          </button>
        </Link>
      </div>

      {/* Lista */}
      <h2 className="text-xl font-semibold mb-3">Últimos gastos registrados</h2>
      <GastoList gastos={gastos.slice(-5).reverse()} onDelete={handleDelete} />

      {/* Gráfico de barras */}
      {datosGrafico.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-center">Gastos por Categoría (Mes Actual)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosGrafico} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
