// RUTAS = relacionan cada URL + método HTTP con una función del controlador.
// Patrón del backend: Ruta → Controlador → Modelo → Base de datos
import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller';

// Router = un "mini servidor" solo para las rutas de productos.
// En App.ts se conecta con: app.use('/api/v1/productos', productosRoutes)
const router = Router();

// GET    = leer      | POST = crear
// PUT    = reemplazar | DELETE = borrar
// '/:id' = la URL trae un valor variable, por ejemplo /api/v1/productos/3 (se lee con req.params.id)
router.get('/', ProductoController.obtenerTodos);
router.get('/:id', ProductoController.obtenerPorId);
router.post('/', ProductoController.crear);
router.put('/:id', ProductoController.actualizar);
router.delete('/:id', ProductoController.eliminar);

export default router;
