-- =============================================
-- DATOS INICIALES DE "lulosa"
-- Se puede ejecutar varias veces: primero vacia las tablas.
-- =============================================

TRUNCATE compra_productos, compras, productos, clientes RESTART IDENTITY CASCADE;

-- Clientes (usuarios del login)
INSERT INTO clientes (id, nombre, apellido, edad, sexo, email, password, fecha_creacion) VALUES
  (1, 'Ana',    'Gomez',     28, 'Femenino',  'ana.gomez@example.com',        'ana123',    '2026-10-05 18:00:00'),
  (2, 'Carlos', 'Rodriguez', 34, 'Masculino', 'carlos.rodriguez@example.com', 'carlos123', '2026-10-05 18:05:00');

-- Productos
INSERT INTO productos (id, codigo, nombre, categoria, dispositivo, precio, stock) VALUES
  (1,  'LUL-001', 'Vidrio templado',     'Protección', 'iPhone',             20000, 15),
  (2,  'LUL-002', 'Smart Case',          'Fundas',     'iPad',               70000, 8),
  (3,  'LUL-003', 'Estuche para tablet', 'Fundas',     'Samsung Galaxy Tab', 65000, 4),
  (4,  'LUL-004', 'Pencil punta fina',   'Accesorios', 'Universal',          35000, 12),
  (5,  'LUL-005', 'Audífonos Bluetooth', 'Audio',      'Universal',          75000, 6),
  (6,  'LUL-006', 'Cable V8',            'Cables',     'Android',            15000, 20),
  (7,  'LUL-007', 'Vidrio para tablet',  'Protección', 'iPad',               25000, 10),
  (8,  'LUL-008', 'Case para AirPods',   'Fundas',     'AirPods',            25000, 3),
  (9,  'LUL-009', 'Protector de cámara', 'Protección', 'iPhone',             18000, 9),
  (10, 'LUL-010', 'Teclado para tablet', 'Accesorios', 'iPad',               90000, 5);

-- Compras
INSERT INTO compras (id, cliente_id, fecha, total, estado) VALUES
  (1, 1, '2026-10-15', 55000, 'Completada'),
  (2, 2, '2026-10-18', 70000, 'Pendiente');

-- Productos de cada compra
INSERT INTO compra_productos (compra_id, producto_id, cantidad, precio) VALUES
  (1, 1, 2, 20000),
  (1, 6, 1, 15000),
  (2, 2, 1, 70000);

-- Como los id se pusieron a mano, se ajustan los contadores (SERIAL)
-- para que el proximo registro siga en el numero correcto.
SELECT setval('clientes_id_seq',  (SELECT MAX(id) FROM clientes));
SELECT setval('productos_id_seq', (SELECT MAX(id) FROM productos));
SELECT setval('compras_id_seq',   (SELECT MAX(id) FROM compras));
SELECT setval('compra_productos_id_seq', (SELECT MAX(id) FROM compra_productos));

-- ---------------------------------------------
-- Consultas de verificacion
-- ---------------------------------------------

-- 1. Clientes sin la contraseña
SELECT id, nombre, apellido, edad, sexo, email, fecha_creacion FROM clientes;

-- 2. Compras con el nombre del cliente
SELECT c.id, cl.nombre || ' ' || cl.apellido AS cliente, c.fecha, c.total, c.estado
FROM compras c
JOIN clientes cl ON cl.id = c.cliente_id;

-- 3. Detalle de cada compra con subtotal
SELECT cp.compra_id, p.codigo, p.nombre, cp.cantidad, cp.precio, cp.cantidad * cp.precio AS subtotal
FROM compra_productos cp
JOIN productos p ON p.id = cp.producto_id
ORDER BY cp.compra_id;
