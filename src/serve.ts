import dotenv from 'dotenv';

dotenv.config();

import app from './App';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

function startServer() {
  app.listen(PORT, () => {
    logger.log(`API ejecutandose en http://localhost:${PORT}`);
    logger.log('Logger inicializado correctamente');
  });
}

startServer();