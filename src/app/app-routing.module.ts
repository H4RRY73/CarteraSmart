import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./views/components/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {ProfileComponent} from "./views/components/profile/profile.component";
import {ClientesComponent} from "./views/components/clientes/clientes.component";
import {CrearLetraComponent} from "./views/components/crear-letra/crear-letra.component";
import {LetraComponent} from "./views/components/letra/letra.component";
import {RegisterComponent} from "./auth/register/register.component";
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent, // Layout con el sidebar
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'crear-letra', component: CrearLetraComponent },
      { path: 'letras', component: LetraComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
