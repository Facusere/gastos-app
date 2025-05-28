import { useState } from "react";

const categoriasBase = [
  "Alimentos",
  "Transporte",
  "Servicios",
  "Salud",
  "Entretenimiento",
  "Otros"
];

export default function GastoForm({ onSubmit, initialData = {} }) {
  const [monto, setMonto] = useState(initialData.monto || "");
  const [fecha, setFecha] = useState(initialData.fecha || "");
  const [categoria, setCategoria] = useState(
    categoriasBase.includes(initialData.categoria) ? initialData.categoria : "Otros"
  );
  const [categoriaCustom, setCategoriaCustom] = useState(
    !categoriasBase.includes(initialData.categoria) ? initialData.categoria : ""
  );
  const [descripcion, setDescripcion] = useState(initialData.descripcion || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategoria = categoria === "Otros" ? categoriaCustom.trim() : categoria;

    if (!monto || !fecha || !finalCategoria) {
      setError("Todos los campos obligatorios deben completarse.");
      return;
    }

    onSubmit({
      monto: parseFloat(monto),
      fecha,
      categoria: finalCategoria,
      descripcion,
    });

    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
      <h2 className="h4 mb-3 text-center">Registrar Gasto</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Monto */}
      <div className="mb-3">
        <label className="form-label">Monto *</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="form-control"
          required
        />
      </div>

      {/* Fecha */}
      <div className="mb-3">
        <label className="form-label">Fecha *</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="form-control"
          required
        />
      </div>

      {/* Categoría */}
      <div className="mb-3">
        <label className="form-label">Categoría *</label>
        <select
          className="form-select"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">-- Seleccionar --</option>
          {categoriasBase.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Campo para especificar si se elige "Otros" */}
      {categoria === "Otros" && (
        <div className="mb-3">
          <label className="form-label">Especificar categoría *</label>
          <input
            type="text"
            value={categoriaCustom}
            onChange={(e) => setCategoriaCustom(e.target.value)}
            className="form-control"
            placeholder="Ej: Educación, Regalo"
            required
          />
        </div>
      )}

      {/* Descripción */}
      <div className="mb-4">
        <label className="form-label">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="form-control"
          placeholder="(opcional)"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar Gasto
      </button>
    </form>
  );
}



