import { Component, inject, signal } from '@angular/core';
import { Tabla } from '../../Components/tabla/tabla';
import { ProductosService, Producto } from '../../Services/productos';

@Component({
  imports: [Tabla],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  private productosService = inject(ProductosService);

  productos = signal<Producto[]>([]);

  constructor() {
    // Cada vez que se abre la página se piden los productos a la base de datos
    this.productosService.getProductos().subscribe((data) => this.productos.set(data));
  }
}
