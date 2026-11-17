import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../Services/productos';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  private productosService = inject(ProductosService);
  private router = inject(Router);

  producto = {
    codigo: '',
    nombre: '',
    categoria: '',
    dispositivo: '',
    precio: 0,
    stock: 0
  };

  registrarProducto() {
    // Se guarda en la base de datos y se vuelve al inventario, que ya lo mostrará
    this.productosService.crearProducto(this.producto).subscribe({
      next: () => this.router.navigate(['/Inventario']),
      error: (error) => console.error('Error al registrar producto:', error),
    });
  }
}