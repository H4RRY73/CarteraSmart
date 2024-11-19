import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Formulario reactivo
  isSubmitted = false; // Indica si el formulario ha sido enviado
  successMessage = ''; // Mensaje de éxito o error

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    try {
      this.registerForm = this.fb.group({
        companyName: ['', [Validators.required]],
        ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, {
        validators: this.matchPasswords('password', 'confirmPassword')
      });
    } catch (error) {
      console.error('Error al inicializar el formulario:', error);
    }
  }

  // Validación para confirmar que las contraseñas coinciden
  matchPasswords(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passControl = formGroup.get(password);
      const confirmPassControl = formGroup.get(confirmPassword);

      if (!passControl || !confirmPassControl) {
        return null; // Retorna válido si no encuentra los controles
      }

      if (confirmPassControl.errors && !confirmPassControl.errors['passwordMismatch']) {
        return null; // Mantén otros errores si ya existen
      }

      // Establecer error si las contraseñas no coinciden
      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true }; // Devuelve error para el grupo de control
      } else {
        confirmPassControl.setErrors(null);
        return null; // Sin errores
      }
    };
  }

  // Enviar datos al servidor JSON
  onSubmit(): void {
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;
    delete user.confirmPassword; // Eliminar confirmPassword antes de enviar

    this.http.post('https://carterasmart-api.vercel.app/users', user).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso.';
        this.registerForm.reset();
        this.isSubmitted = false;
      },
      error: () => {
        this.successMessage = 'Error al registrar. Intente nuevamente.';
      }
    });
  }
}
