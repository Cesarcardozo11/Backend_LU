export const productosDB: any[] = [
  {
    id: 1,
    codigo: 'LUL-001',
    nombre: 'Vidrio templado',
    categoria: 'Protección',
    dispositivo: 'iPhone',
    precio: 20000,
    stock: 15,
  },
  {
    id: 2,
    codigo: 'LUL-002',
    nombre: 'Smart Case',
    categoria: 'Fundas',
    dispositivo: 'iPad',
    precio: 70000,
    stock: 8,
  },
  {
    id: 3,
    codigo: 'LUL-003',
    nombre: 'Estuche para tablet',
    categoria: 'Fundas',
    dispositivo: 'Samsung Galaxy Tab',
    precio: 65000,
    stock: 4,
  },
  {
    id: 4,
    codigo: 'LUL-004',
    nombre: 'Pencil punta fina',
    categoria: 'Accesorios',
    dispositivo: 'Universal',
    precio: 35000,
    stock: 12,
  },
  {
    id: 5,
    codigo: 'LUL-005',
    nombre: 'Audífonos Bluetooth',
    categoria: 'Audio',
    dispositivo: 'Universal',
    precio: 75000,
    stock: 6,
  },
  {
    id: 6,
    codigo: 'LUL-006',
    nombre: 'Cable V8',
    categoria: 'Cables',
    dispositivo: 'Android',
    precio: 15000,
    stock: 20,
  },
  {
    id: 7,
    codigo: 'LUL-007',
    nombre: 'Vidrio para tablet',
    categoria: 'Protección',
    dispositivo: 'iPad',
    precio: 25000,
    stock: 10,
  },
  {
    id: 8,
    codigo: 'LUL-008',
    nombre: 'Case para AirPods',
    categoria: 'Fundas',
    dispositivo: 'AirPods',
    precio: 25000,
    stock: 3,
  },
  {
    id: 9,
    codigo: 'LUL-009',
    nombre: 'Protector de cámara',
    categoria: 'Protección',
    dispositivo: 'iPhone',
    precio: 18000,
    stock: 9,
  },
  {
    id: 10,
    codigo: 'LUL-010',
    nombre: 'Teclado para tablet',
    categoria: 'Accesorios',
    dispositivo: 'iPad',
    precio: 90000,
    stock: 5,
  },
];

export function obtenerSiguienteId(): number {
  if (productosDB.length === 0) {
    return 1;
  }
  return Math.max(...productosDB.map((p) => p.id)) + 1;
}