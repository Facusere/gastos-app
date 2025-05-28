import { useState } from "react";
import { getGastos } from "../data/gastosService";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const colores = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57",
];

export default function ReporteMensual() {
  const [mes, setMes] = useState("");
  const [resumen, setResumen] = useState([]);

  const handleBuscar = () => {
    const gastos = getGastos();
    const filtrados = gastos.filter((g) => g.fecha.startsWith(mes));

    const agrupados = {};
    filtrados.forEach((g) => {
      agrupados[g.categoria] = (agrupados[g.categoria] || 0) + Number(g.monto);
    });

    const resumenGenerado = Object.entries(agrupados).map(([categoria, monto]) => ({
      categoria,
      monto,
    }));

    setResumen(resumenGenerado);
  };

  const totalGeneral = resumen.reduce((acc, curr) => acc + curr.monto, 0);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Reporte Mensual</h2>

      <div className="card p-4 mb-4 shadow-sm">
        <label className="form-label">Seleccionar mes:</label>
        <div className="d-flex gap-3">
          <input
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="form-control"
            style={{ maxWidth: 200 }}
          />
          <button onClick={handleBuscar} className="btn btn-success">
            Generar Reporte
          </button>
        </div>
      </div>

      {resumen.length > 0 ? (
        <div className="row g-4">
          {/* Gráfico */}
          <div className="col-md-6 d-flex justify-content-center">
            <PieChart width={300} height={300}>
              <Pie
                data={resumen}
                dataKey="monto"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {resumen.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Tabla resumen */}
          <div className="col-md-6">
            <h5 className="mb-3">Totales por Categoría</h5>
            <table className="table table-bordered table-sm">
              <thead className="table-light">
                <tr>
                  <th>Categoría</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                {resumen.map((item, i) => (
                  <tr key={i}>
                    <td>{item.categoria}</td>
                    <td>${item.monto.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="fw-bold">
                  <td>Total</td>
                  <td>${totalGeneral.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        mes && (
          <p className="text-center text-muted mt-4">
            No hay datos disponibles para el mes seleccionado.
          </p>
        )
      )}
    </div>
  );
}


