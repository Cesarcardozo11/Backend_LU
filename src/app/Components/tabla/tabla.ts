import { Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import titulos from './titulos.json';

// Describe una columna: qué campo del objeto mostrar y qué título ponerle
export interface Columna {
  campo: string;
  titulo: string;
}

// Tabla reutilizable: recibe las filas que llegan de la base de datos (data)
// y arma las columnas sola con las keys del JSON.
@Component({
  imports: [MatTableModule],
  selector: 'app-tabla',
  styleUrl: './tabla.css',
  templateUrl: './tabla.html',
})
export class Tabla {
  readonly data = input<any[]>([]);

  // Ejemplo: si la primera fila es { id: 1, codigo: 'LUL-001' }
  // las keys son ['id', 'codigo'] y los títulos salen de titulos.json.
  // Si una key no está en titulos.json, se usa la key tal cual.
  readonly columnas = computed<Columna[]>(() => {
    const primeraFila = this.data()[0];
    if (!primeraFila) {
      return [];
    }
    const nombres: Record<string, string> = titulos;
    return Object.keys(primeraFila).map((key) => ({
      campo: key,
      titulo: nombres[key] || key,
    }));
  });

  // mat-table necesita solo la lista de nombres de campo
  readonly displayedColumns = computed(() => this.columnas().map((c) => c.campo));
}
