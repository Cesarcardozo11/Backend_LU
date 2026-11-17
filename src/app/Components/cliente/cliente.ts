import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  compras: number;
}

@Component({
  imports: [MatButtonModule, MatCardModule],
  selector: 'app-cliente',
  styleUrl: './cliente.css',
  templateUrl: './cliente.html',
})
export class ClienteComponent {
  readonly cliente = input.required<Cliente>();

  readonly seleccionar = output<Cliente>();

  readonly iniciales = computed(() =>
    this.cliente()
      .nombre.split(' ')
      .filter((parte) => parte.length > 0)
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join(''),
  );

  readonly telefonoEnlace = computed(() => `tel:${this.cliente().telefono.replace(/[\s()-]/g, '')}`);
}
