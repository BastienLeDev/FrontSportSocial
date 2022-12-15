import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(public authService: AuthService, private route: Router) { }

  goToRanking() {
    this.route.navigateByUrl('ranking');
  }
}
