import { Component, inject, signal } from '@angular/core';
import { Tabla } from '../../Components/tabla/tabla';
import { ComprasService } from '../../Services/compras';

@Component({
  imports: [Tabla],
  selector: 'app-compras',
  styleUrl: './compras.css',
  templateUrl: './compras.html',
})
export class Compras {
  private comprasService = inject(ComprasService);

  compras = signal<any[]>([]);

  constructor() {
    this.comprasService.getCompras().subscribe((data) => {
      // Se ajustan algunos campos para que se vean bien en la tabla
      const filas = data.map((compra) => ({
        ...compra,
        fecha: compra.fecha.slice(0, 10),
        productos: compra.productos.map((p) => `${p.cantidad} x ${p.nombre}`).join(', '),
      }));
      this.compras.set(filas);
    });
  }
}
