import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../Services/auth.service';
import { LoginRequest } from '../../Services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage.set('');
    this.loading.set(true);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success) {
          this.router.navigate(['/Clientes']);
        } else {
          this.errorMessage.set(response.message);
        }
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(error.error?.message || 'Error al iniciar sesión');
        console.error('Error de login:', error);
      }
    });
  }
}
