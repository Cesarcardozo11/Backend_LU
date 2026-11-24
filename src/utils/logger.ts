// Logger = escribe mensajes en la consola con la fecha y hora.
// datos?: unknown = parámetro opcional (?) de tipo desconocido (unknown)
function log(mensaje: string, datos?: unknown): void {
  // toLocaleString = la fecha en texto, en formato español
  const ts = new Date().toLocaleString('es-ES');
  const args: unknown[] = [ts, mensaje];

  // Si vienen datos extra, se agregan al final
  if (datos !== undefined) {
    args.push(datos);
  }

  // ...args = spread: pasa cada elemento de la lista como un valor separado
  console.log(...args);
}

// export = se puede usar en otros archivos con: import logger from './utils/logger'
export const logger = {
  log: (mensaje: string, datos?: unknown): void => log(mensaje, datos),
};

export default logger;
