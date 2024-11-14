import { Component, OnInit } from '@angular/core';

interface BankInsurance {
  bank: string;
  rate: number;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  title = 'Bienvenido a CarteraSmart';
  description = `
    CarteraSmart es una herramienta tecnológica diseñada para pequeñas y medianas empresas,
    facilitando la gestión de cuentas por cobrar mediante el descuento de letras y facturas.
    Nuestro objetivo es ayudar a las empresas a mejorar su flujo de caja y tomar decisiones financieras
    informadas, con un enfoque en el cálculo de la Tasa de Coste Efectivo Anual (TCEA).
  `;

  bankInsurances: BankInsurance[] = [
    { bank: 'BCP', rate: 0.165, description: 'El BCP ofrece un seguro de gravamen con una tasa del 0.165%', logo: 'assets/logos/bcp.jpg' },
    { bank: 'BBVA', rate: 0.256, description: 'BBVA ofrece una cobertura con una tasa del 0.256%', logo: 'assets/logos/bbva.jpg' },
    { bank: 'Scotiabank', rate: 0.256, description: 'Scotiabank brinda un seguro de gravamen al 0.256%', logo: 'assets/logos/scotiabank.png' },
    { bank: 'Interbank', rate: 0.39, description: 'Interbank maneja una tasa del 0.39% para su seguro de gravamen', logo: 'assets/logos/interbank.jpg' }
  ];

  teamMembers = [
    'Daniel Fabrizzio Trujillo Segura',
    'Harold Jaime Mayta Lopez',
    'Brayan Stiven Gamboa Delgado',
    'Merly Salon Puerta',
    'Luis Julian Rupay Flores'
  ];

  constructor() { }

  ngOnInit(): void { }
}
