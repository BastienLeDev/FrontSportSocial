import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpProfilComponent } from '../pop-up-profil/pop-up-profil.component';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(public authService: AuthService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }

  }

  goToRanking() {
    this.route.navigateByUrl('ranking');
  }

  openModifDonneesPersosModal() {
    const dialogRef = this.dialog.open(PopUpProfilComponent)
  }

}
