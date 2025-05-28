const STORAGE_KEY = "gastos";

export function getGastos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveGastos(gastos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos));
}

export function getGastoById(id) {
  const gastos = getGastos();
  return gastos.find((g) => g.id === Number(id));
}

export function updateGasto(updated) {
  const gastos = getGastos();
  const nuevos = gastos.map((g) => (g.id === updated.id ? updated : g));
  saveGastos(nuevos);
}

export function addGasto(nuevo) {
  const gastos = getGastos();
  const id = Date.now();
  const conId = { ...nuevo, id };
  saveGastos([...gastos, conId]);
}
