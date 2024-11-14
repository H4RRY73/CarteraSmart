import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service"; // Importa Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inyecta AuthService
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.getUsers().subscribe({
      next: (users) => {
        const user = users.find((u: any) => u.email === email && u.password === password);

        if (user) {
          // Guardar usuario autenticado
          this.authService.setAuthenticatedUser(user);

          console.log('Login exitoso');
          this.loginError = null;
          alert('¡Inicio de sesión exitoso!');

          // Redirigir al perfil
          this.router.navigate(['/home']);
        } else {
          this.loginError = 'Credenciales incorrectas. Intente nuevamente.';
        }
      },
      error: (err) => {
        console.error('Error al consultar usuarios:', err);
        this.loginError = 'Ocurrió un error. Intente más tarde.';
      }
    });
  }

}
