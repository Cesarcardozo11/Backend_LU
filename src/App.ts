// Express = librería para crear el servidor y la API
import express from 'express';
// cors = permite que el frontend (otro dominio/puerto) llame a esta API
import cors from 'cors';

import logger from './utils/logger';
import clientesRoutes from './routes/clientes.routes';
import productosRoutes from './routes/productos.routes';
import comprasRoutes from './routes/compras.routes';
import { AuthController } from './controllers/auth.controller';

// app = el servidor de Express
const app = express();

// app.use = agrega un MIDDLEWARE: una función que se ejecuta en CADA petición antes de llegar a la ruta.

// CORS: sin esto, el navegador bloquea las peticiones que vienen de Angular
app.use(cors());

// express.json() = convierte el body de la petición (JSON) en un objeto que se puede leer en req.body
app.use(express.json());

// Middleware propio: escribe en la consola cada petición que llega (ej. "GET /api/v1/productos").
// req = la petición | res = la respuesta | next() = "sigue a la siguiente función"
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
  next();
});

// Health check = una ruta que solo responde "estoy vivo"
app.get('/api/v1/health', (req, res) => {
  logger.log('Health check solicitado');
  // res.json = responde con datos en formato JSON
  res.json({
    status: 'OK'
  });
});

// Configurar rutas (endpoint = URL + método HTTP)
// app.post = esta URL solo acepta POST
app.post('/api/auth/login', AuthController.login);
app.post('/api/auth/registro', AuthController.registrar);
// app.use con rutas = todas las URLs que empiecen así las maneja ese archivo de rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/compras', comprasRoutes);

// export default = lo que entrega este archivo cuando otro lo importa
export default app;
