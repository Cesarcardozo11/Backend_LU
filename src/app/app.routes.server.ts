import { RenderMode, ServerRoute } from '@angular/ssr';

// Las páginas se dibujan en el navegador (Client), no en el servidor.
// La sesión vive en localStorage, que solo existe en el navegador;
// si el servidor dibujara las rutas protegidas, el guard no vería la sesión
// y siempre mandaría a /login.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
