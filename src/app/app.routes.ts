import { Routes } from '@angular/router';
import { Clientes } from './View/clientes/clientes';
import { Compras } from './View/compras/compras';
import { Inventario } from './View/inventario/inventario';
import { Form } from './Components/form/form';
import { Login } from './Components/login/login';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'Clientes', component: Clientes, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'Compras', component: Compras, canActivate: [authGuard] },
  { path: 'Inventario', component: Inventario, canActivate: [authGuard] },
  { path: 'form', component: Form, canActivate: [authGuard] },
];
