import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para redirigir
import { AuthService } from '../../../auth/auth.service'; // Importa AuthService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navLinks = [
    { path: '/home', label: 'Inicio', icon: 'home' },
    { path: '/profile', label: 'Perfil', icon: 'person' },
    { path: '/clientes', label: 'Clientes', icon: 'people' },
    { path: '/crear-letra', label: 'Crear Letra', icon: 'note_add' },
    { path: '/letras', label: 'Letras', icon: 'note' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
