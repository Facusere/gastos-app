import { Link } from "react-router-dom";

export default function GastoItem({ gasto, onDelete }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{gasto.categoria}</h5>
          <p className="card-text mb-1 text-muted">{gasto.fecha}</p>
          <p className="card-text">💵 ${gasto.monto}</p>
          {gasto.descripcion && (
            <small className="text-muted">{gasto.descripcion}</small>
          )}
        </div>
        <div className="d-flex gap-2">
          <Link to={`/editar/${gasto.id}`} className="btn btn-warning btn-sm">
            Editar
          </Link>
          <button
            onClick={() => onDelete(gasto.id)}
            className="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}


