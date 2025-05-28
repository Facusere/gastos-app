import { useEffect, useState } from "react";
import { getGastos } from "../data/gastosService";

export default function FiltroGastos({ onFiltrar }) {
  const [mes, setMes] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  useEffect(() => {
    const gastos = getGastos();
    const unicas = [...new Set(gastos.map((g) => g.categoria))];
    setCategoriasUnicas(unicas);
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    onFiltrar({ mes, categoria });
  };

  const handleReset = () => {
    setMes("");
    setCategoria("Todas");
    onFiltrar({});
  };

  return (
    <form className="card p-4 mb-4 shadow-sm" onSubmit={handleFiltrar}>
      <h5 className="card-title mb-3">Filtrar por Mes y Categoría</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Mes</label>
          <input
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Categoría</label>
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Todas">Todas</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button type="submit" className="btn btn-primary">Aplicar filtros</button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">Limpiar</button>
      </div>
    </form>
  );
}
