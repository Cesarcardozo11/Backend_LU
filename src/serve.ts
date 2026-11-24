// serve.ts = el PRIMER archivo que se ejecuta en el backend: enciende el servidor.

// dotenv = librería que lee el archivo .env y guarda sus valores en process.env
import dotenv from 'dotenv';

dotenv.config();

import app from './App';
import logger from './utils/logger';

// process.env.PORT = el puerto que viene del .env (o de Railway).
// || 3000 = si no viene ninguno, usa el 3000
const PORT = process.env.PORT || 3000;

function startServer() {
  // app.listen = el servidor empieza a "escuchar" peticiones en ese puerto
  app.listen(PORT, () => {
    logger.log(`API ejecutandose en http://localhost:${PORT}`);
    logger.log('Logger inicializado correctamente');
  });
}

startServer();
