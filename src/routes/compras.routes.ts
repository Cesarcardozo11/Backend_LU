// RUTAS de compras: cada URL + método HTTP llama a una función del controlador.
// Mismo patrón que productos.routes.ts (ver sus comentarios).
import { Router } from 'express';
import { CompraController } from '../controllers/compra.controller';

const router = Router();

router.get('/', CompraController.obtenerTodos);
router.get('/:id', CompraController.obtenerPorId);
router.post('/', CompraController.crear);
router.put('/:id', CompraController.actualizar);
router.delete('/:id', CompraController.eliminar);

export default router;