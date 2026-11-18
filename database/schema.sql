-- =============================================
-- ESQUEMA DE LA BASE DE DATOS "lulosa"
-- Ejecutar conectado a la base lulosa.
-- =============================================

-- Clientes de la tienda. Tambien son los usuarios del login.
CREATE TABLE IF NOT EXISTS clientes (
  id             SERIAL PRIMARY KEY,
  nombre         VARCHAR(50)  NOT NULL,
  apellido       VARCHAR(50)  NOT NULL,
  edad           INTEGER,
  sexo           VARCHAR(20),
  email          VARCHAR(100) NOT NULL UNIQUE,  -- no se puede repetir
  password       VARCHAR(100) NOT NULL,         -- texto plano: solo para practica
  fecha_creacion TIMESTAMP    DEFAULT NOW()
);

-- Productos del inventario
CREATE TABLE IF NOT EXISTS productos (
  id          SERIAL PRIMARY KEY,
  codigo      VARCHAR(20)  NOT NULL UNIQUE,     -- ejemplo: LUL-001
  nombre      VARCHAR(100) NOT NULL,
  categoria   VARCHAR(50)  NOT NULL,
  dispositivo VARCHAR(50)  NOT NULL,
  precio      INTEGER      NOT NULL CHECK (precio >= 0),  -- pesos, sin decimales
  stock       INTEGER      NOT NULL CHECK (stock >= 0)
);

-- Encabezado de cada compra: quien compro, cuando, total y estado
CREATE TABLE IF NOT EXISTS compras (
  id         SERIAL PRIMARY KEY,
  cliente_id INTEGER     NOT NULL REFERENCES clientes(id),
  fecha      DATE        NOT NULL DEFAULT CURRENT_DATE,
  total      INTEGER     NOT NULL,
  estado     VARCHAR(20) NOT NULL CHECK (estado IN ('Pendiente', 'Completada'))
);

-- Detalle: que productos lleva cada compra.
-- Si se borra una compra, sus filas aqui se borran solas (ON DELETE CASCADE).
CREATE TABLE IF NOT EXISTS compra_productos (
  id          SERIAL PRIMARY KEY,
  compra_id   INTEGER NOT NULL REFERENCES compras(id) ON DELETE CASCADE,
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  cantidad    INTEGER NOT NULL CHECK (cantidad > 0),
  precio      INTEGER NOT NULL  -- precio al momento de la compra
);
