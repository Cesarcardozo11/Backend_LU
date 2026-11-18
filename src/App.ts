import express from 'express';
import cors from 'cors';

import logger from './utils/logger';
import clientesRoutes from './routes/clientes.routes';
import productosRoutes from './routes/productos.routes';
import comprasRoutes from './routes/compras.routes';
import { AuthController } from './controllers/auth.controller';

const app = express();

app.use(cors());

app.use(express.json());

// Middleware para registrar las solicitudes entrantes 
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.path}`);
  next();
});

// Ruta de health check
app.get('/api/v1/health', (req, res) => {
  logger.log('Health check solicitado');
  res.json({
    status: 'OK'
  });
});

// Configurar rutas
app.post('/api/auth/login', AuthController.login);
app.use('/api/clientes', clientesRoutes);
app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/compras', comprasRoutes);

export default app;