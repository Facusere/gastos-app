import GastoItem from "./GastoItem";

export default function GastoList({ gastos, onDelete }) {
  if (gastos.length === 0) {
    return <p className="text-gray-500 text-center">No hay gastos registrados.</p>;
  }

  return (
    <div>
      {gastos.map((gasto) => (
        <GastoItem key={gasto.id} gasto={gasto} onDelete={onDelete} />
      ))}
    </div>
  );
}
