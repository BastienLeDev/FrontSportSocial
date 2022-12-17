import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpProfilComponent } from '../pop-up-profil/pop-up-profil.component';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { PopUpModifMdpComponent } from '../pop-up-modif-mdp/pop-up-modif-mdp.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  activite: any;
  userToken: any;
  visibleMemos = true;
  constructor(public authService: AuthService, private route: Router, private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.listActivite();
    this.getToken();
  }



  showHideMemos() {
    if (this.visibleMemos == false) {
      this.visibleMemos = true;
    } else {
      this.visibleMemos = false;
    }
  }

  goToRanking() {
    this.route.navigateByUrl('ranking');
  }

  openModifDonneesPersosModal() {
    const dialogRef = this.dialog.open(PopUpProfilComponent)
  }

  openChangerMdp() {
    const dialogRef = this.dialog.open(PopUpModifMdpComponent)
  }

  goToShop() {
    this.route.navigateByUrl('shop');
  }

  listActivite() {

    this.http.get('http://localhost:8300/activity/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.activite = data, console.log(this.activite); },

      error: (err) => { console.log(err); }

    });
  }

  getToken() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userToken = data
      },

      error: (err) => { console.log(err); }

    });
  }

}
