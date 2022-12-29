import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpProfilComponent } from '../pop-up-profil/pop-up-profil.component';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { PopUpModifMdpComponent } from '../pop-up-modif-mdp/pop-up-modif-mdp.component';
import { PopUpInventaireComponent } from '../pop-up-inventaire/pop-up-inventaire.component';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  activite: any;
  userInfo: any;
  visibleMemos = true;
  //classToggled : boolean = false;
  classToggled = this.dark.classToggled;

  constructor(public authService: AuthService, private route: Router, private dialog: MatDialog, private http: HttpClient, private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.infoUser();
    this.listActivite();
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
    const dialogRef = this.dialog.open(PopUpProfilComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }

  openChangerMdp() {
    const dialogRef = this.dialog.open(PopUpModifMdpComponent, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }

  goToShop() {
    this.route.navigateByUrl('shop');
  }

  openInventaire() {
    const dialogRef = this.dialog.open(PopUpInventaireComponent, {
      width: '500px'
    })
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }

  listActivite() {

    this.http.get('http://localhost:8300/activity/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.activite = data, console.log(this.activite); },

      error: (err) => { console.log(err); }

    });
  }


  infoUser() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log(this.userInfo)
      },
      error: (err) => { console.log(err); }
    });
  }
}
