import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  email: string = '';
  companyName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getAuthenticatedUser();

    if (user) {
      this.username = user.username;
      this.email = user.email;
      this.companyName = user.companyName;
    } else {
      console.error('No hay usuario autenticado.');
    }
  }
}
