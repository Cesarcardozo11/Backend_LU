import { Injectable, signal } from '@angular/core';

// Cada registro: cuándo pasó, qué tipo es y qué pasó
export interface LogEntry {
  fecha: Date;
  nivel: 'info' | 'error';
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // Lista de todos los logs. Es un signal para que la pantalla se actualice sola.
  readonly logs = signal<LogEntry[]>([]);

  // Para eventos normales: "se cargaron los productos"
  info(mensaje: string): void {
    this.agregar('info', mensaje);
  }

  // Para cuando algo falla: "no se pudo conectar con el servidor"
  error(mensaje: string): void {
    this.agregar('error', mensaje);
  }

  // Borra todos los logs
  limpiar(): void {
    this.logs.set([]);
  }

  // Guarda el log en la lista y lo muestra en la consola del navegador
  private agregar(nivel: LogEntry['nivel'], mensaje: string): void {
    this.logs.update((logs) => [...logs, { fecha: new Date(), nivel, mensaje }]);
    console.log(`[${nivel}] ${mensaje}`);
  }
}
