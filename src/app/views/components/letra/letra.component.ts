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

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.css']
})
export class LetraComponent implements OnInit {
  users: any[] = [];
  letras: Letra[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLetras();
  }

  loadLetras(): void {
    this.http.get('http://localhost:3000/users').subscribe(
      (data: any) => {
        this.users = data;
        this.extractLetras();
      },
      error => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  extractLetras(): void {
    this.users.forEach(user => {
      if (user.clients) {
        user.clients.forEach((client: Client) => {
          if (client.letras) {
            this.letras.push(...client.letras);
          }
        });
      }
    });
  }

  exportToPDF(): void {
    const data = document.getElementById('letras-content'); // Identifica el contenedor de las letras
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208; // Ancho del PDF en mm
        const pageHeight = 295; // Altura de la página del PDF en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4'); // Crear PDF
        let position = 0;
        
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('letras.pdf'); // Descargar el PDF
      });
    }
  }
}
