export const comprasDB: any[] = [
  {
    id: 1,
    clienteId: 1,
    clienteNombre: 'Carlos Mendoza',
    fecha: new Date('2026-10-15'),
    productos: [
      { productoId: 1, codigo: 'LUL-001', nombre: 'Vidrio templado', cantidad: 2, precio: 20000 },
      { productoId: 6, codigo: 'LUL-006', nombre: 'Cable V8', cantidad: 1, precio: 15000 },
    ],
    total: 55000,
    estado: 'Completada',
  },
  {
    id: 2,
    clienteId: 2,
    clienteNombre: 'Ana López',
    fecha: new Date('2026-10-18'),
    productos: [
      { productoId: 2, codigo: 'LUL-002', nombre: 'Smart Case', cantidad: 1, precio: 70000 },
    ],
    total: 70000,
    estado: 'Pendiente',
  },
];

export function obtenerSiguienteId(): number {
  if (comprasDB.length === 0) {
    return 1;
  }
  return Math.max(...comprasDB.map((c) => c.id)) + 1;
}