import { Component, inject, signal } from '@angular/core';
import { Tabla } from '../../Components/tabla/tabla';
import { ClientesService, Cliente } from '../../Services/clientes';

@Component({
  selector: 'app-clientes',
  imports: [Tabla],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {
  private clientesService = inject(ClientesService);

  clientes = signal<Cliente[]>([]);

  constructor() {
    this.clientesService.getClientes().subscribe((data) => this.clientes.set(data));
  }
}
