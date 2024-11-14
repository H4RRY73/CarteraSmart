import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  clientForm: FormGroup;
  clients: any[] = [];
  showForm: boolean = false; // Controla la visibilidad del formulario

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getAuthenticatedUser();
    if (currentUser) {
      this.clients = currentUser.clients || [];
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addClient(): void {
    if (this.clientForm.invalid) {
      return;
    }

    // Generar un ID único y secuencial
    const newId = this.clients.length > 0
      ? Math.max(...this.clients.map(client => client.id)) + 1
      : 1;

    const newClient = {
      id: newId,
      ...this.clientForm.value
    };

    this.clients.push(newClient);

    const currentUser = this.authService.getAuthenticatedUser();
    if (currentUser) {
      currentUser.clients = this.clients;

      // Actualizar en el servidor
      this.authService.updateUser(currentUser.id, currentUser).subscribe({
        next: () => {
          console.log('Cliente agregado exitosamente.');
          this.clientForm.reset();
          this.showForm = false; // Ocultar el formulario tras agregar el cliente
        },
        error: (err) => {
          console.error('Error al agregar cliente:', err);
        }
      });
    }
  }
}
