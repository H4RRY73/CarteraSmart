import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navLinks = [
    { path: '/home', label: 'Inicio', icon: 'home' },
    {path: '/profile', label: 'Perfil', icon: 'person' },
    {path: '/clientes', label: 'Clientes', icon: 'people' },
    {path: '/crear-letra', label: 'Crear Letra', icon: 'note_add' },
    {path: '/letras', label: 'Letras', icon: 'note' }
  ];

}
