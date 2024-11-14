import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router'; // Importar para usar routerLink en el Sidebar

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule // Importar para que funcione routerLink
  ],
  exports: [SidebarComponent] // Exportar para que otros módulos puedan usar el Sidebar
})
export class SharedModule { }
