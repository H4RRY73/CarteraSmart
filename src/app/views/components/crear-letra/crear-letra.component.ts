import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-crear-letra',
  templateUrl: './crear-letra.component.html',
  styleUrl: './crear-letra.component.css'
})
export class CrearLetraComponent implements OnInit {
  clients: any[] = [];
  selectedClientId: number | null = null;
  selectedClient: any = null;

  // Opciones de seguro
  seguroOptions = [
    { name: 'BCP', rate: 0.00165 },
    { name: 'BBVA', rate: 0.00256 },
    { name: 'Scotiabank', rate: 0.00256 },
    { name: 'Interbank', rate: 0.0039 }
  ];

  letraForm: FormGroup;
  resultados: any = null; // Almacena los resultados del cálculo

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.letraForm = this.fb.group({
      valorNominal: ['', [Validators.required, Validators.min(1)]],
      fechaEmision: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      fechaDescuento: ['', [Validators.required]],
      tasaEfectiva: ['', [Validators.required, Validators.min(0)]],
      seguro: ['', [Validators.required]],
      costosAdministrativos: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getAuthenticatedUser();
    if (currentUser && currentUser.clients) {
      this.clients = currentUser.clients;
    } else {
      console.error('No hay clientes disponibles o el usuario no está autenticado.');
    }
  }

  onClientChange(clientId: string): void {
    this.selectedClientId = parseInt(clientId, 10);
    this.selectedClient = this.clients.find(client => client.id === this.selectedClientId);
  }

  calcularResultados(data: any): any {
    const valorNominal = parseFloat(data.valorNominal);
    const fechaVencimiento = new Date(data.fechaVencimiento);
    const fechaDescuento = new Date(data.fechaDescuento);
    const tasaEfectivaAnual = parseFloat(data.tasaEfectiva);
    const seguroRate = parseFloat(data.seguro);
    const costosAdministrativos = parseFloat(data.costosAdministrativos);

    // Días de descuento (calendario comercial)
    const diasDescuento =
      (fechaVencimiento.getFullYear() - fechaDescuento.getFullYear()) * 360 +
      (fechaVencimiento.getMonth() - fechaDescuento.getMonth()) * 30 +
      (fechaVencimiento.getDate() - fechaDescuento.getDate());

    // Tasa Efectiva del Periodo
    const tasaEfectivaPeriodo = Math.pow(1 + tasaEfectivaAnual, diasDescuento / 360) - 1;

    // Tasa de Descuento
    const tasaDescuento = tasaEfectivaPeriodo / (1 + tasaEfectivaPeriodo);

    // Descuento
    const descuento = valorNominal * tasaDescuento;

    // Valor Neto antes del Seguro
    const valorNetoAntesSeguro = valorNominal - descuento;

    // Costo del Seguro
    const costoSeguro = valorNominal * seguroRate;

    // Valor Recibido y Entregado
    const valorRecibido = valorNetoAntesSeguro - costoSeguro;
    const valorEntregado = valorNominal + costosAdministrativos;

    // TCEA
    const tcea = Math.pow(valorEntregado / valorRecibido, 360 / diasDescuento) - 1;

    return {
      diasDescuento,
      tasaEfectivaPeriodo: tasaEfectivaPeriodo * 100, // Convertimos a porcentaje
      tasaDescuento: tasaDescuento * 100, // Convertimos a porcentaje
      descuento,
      valorNetoAntesSeguro,
      costoSeguro,
      valorRecibido,
      valorEntregado,
      tcea: tcea * 100 // Convertimos a porcentaje
    };
  }


  onSubmit(): void {
    if (this.letraForm.invalid || !this.selectedClient) {
      return;
    }

    // Calcular los resultados
    const formData = this.letraForm.value;
    this.resultados = this.calcularResultados(formData);

    // Crear la letra con los datos del formulario y los resultados
    const newLetra = {
      id: Date.now(), // Usamos un timestamp como ID único temporal
      ...formData,
      ...this.resultados
    };

    // Asociar la letra al cliente seleccionado
    this.selectedClient.letras = this.selectedClient.letras || [];
    this.selectedClient.letras.push(newLetra);

    // Obtener el usuario autenticado
    const currentUser = this.authService.getAuthenticatedUser();
    if (currentUser) {
      // Actualizar al usuario en el servidor con las letras asociadas
      this.authService.updateUser(currentUser.id, currentUser).subscribe({
        next: () => {
          console.log('Letra guardada exitosamente.');
          this.letraForm.reset();
          this.selectedClientId = null;
          this.selectedClient = null;
          this.resultados = null;
        },
        error: (err) => {
          console.error('Error al guardar la letra:', err);
        }
      });
    }
  }
}
