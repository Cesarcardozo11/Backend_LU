function log(mensaje: string, datos?: unknown): void {
  const ts = new Date().toLocaleString('es-ES');
  const args: unknown[] = [ts, mensaje];

  if (datos !== undefined) {
    args.push(datos);
  }

  console.log(...args);
}

export const logger = {
  log: (mensaje: string, datos?: unknown): void => log(mensaje, datos),
};

export default logger;
