import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Letra {
  id: number;
  valorNominal: number;
  fechaEmision: string;
  fechaVencimiento: string;
  fechaDescuento: string;
  tasaEfectiva: number;
  seguro: string;
  costosAdministrativos: number;
  diasDescuento: number;
  tasaEfectivaPeriodo: number;
  tasaDescuento: number;
  descuento: number;
  valorNetoAntesSeguro: number;
  costoSeguro: number;
  valorRecibido: number;
  valorEntregado: number;
  tcea: number;
}

interface Client {
  id: number;
  name: string;
  email: string;
  dni: string;
  letras?: Letra[];
}

interface User {
  id: string;
  companyName: string;
  ruc: string;
  username: string;
  email: string;
  password: string;
  clients: Client[];
}

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null; // Usuario ingresado

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar todos los usuarios
  loadUsers(): void {
    this.http.get<User[]>('http://localhost:3000/users').subscribe(
      (data) => {
        this.users = data;
        this.identifyCurrentUser(); // Identificar al usuario ingresado
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  // Identificar al usuario que ha ingresado
  identifyCurrentUser(): void {
    // Aquí debes establecer la lógica para identificar al usuario ingresado.
    // Selecciona el primer usuario como ejemplo (modifica según tu lógica de autenticación)
    this.currentUser = this.users[0] || null;
  }

  // Exportar las letras a un archivo PDF
  exportToPDF(): void {
    const data = document.getElementById('letras-content');
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('letras.pdf');
      });
    }
  }
}
