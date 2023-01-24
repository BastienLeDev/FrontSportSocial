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
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const Option = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M308.5 135.3c7.1-6.3 9.9-16.2 6.2-25c-2.3-5.3-4.8-10.5-7.6-15.5L304 89.4c-3-5-6.3-9.9-9.8-14.6c-5.7-7.6-15.7-10.1-24.7-7.1l-28.2 9.3c-10.7-8.8-23-16-36.2-20.9L199 27.1c-1.9-9.3-9.1-16.7-18.5-17.8C173.7 8.4 166.9 8 160 8s-13.7 .4-20.4 1.2c-9.4 1.1-16.6 8.6-18.5 17.8L115 56.1c-13.3 5-25.5 12.1-36.2 20.9L50.5 67.8c-9-3-19-.5-24.7 7.1c-3.5 4.7-6.8 9.6-9.9 14.6l-3 5.3c-2.8 5-5.3 10.2-7.6 15.6c-3.7 8.7-.9 18.6 6.2 25l22.2 19.8C32.6 161.9 32 168.9 32 176s.6 14.1 1.7 20.9L11.5 216.7c-7.1 6.3-9.9 16.2-6.2 25c2.3 5.3 4.8 10.5 7.6 15.6l3 5.2c3 5.1 6.3 9.9 9.9 14.6c5.7 7.6 15.7 10.1 24.7 7.1l28.2-9.3c10.7 8.8 23 16 36.2 20.9l6.1 29.1c1.9 9.3 9.1 16.7 18.5 17.8c6.7 .8 13.5 1.2 20.4 1.2s13.7-.4 20.4-1.2c9.4-1.1 16.6-8.6 18.5-17.8l6.1-29.1c13.3-5 25.5-12.1 36.2-20.9l28.2 9.3c9 3 19 .5 24.7-7.1c3.5-4.7 6.8-9.5 9.8-14.6l3.1-5.4c2.8-5 5.3-10.2 7.6-15.5c3.7-8.7 .9-18.6-6.2-25l-22.2-19.8c1.1-6.8 1.7-13.8 1.7-20.9s-.6-14.1-1.7-20.9l22.2-19.8zM208 176c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM504.7 500.5c6.3 7.1 16.2 9.9 25 6.2c5.3-2.3 10.5-4.8 15.5-7.6l5.4-3.1c5-3 9.9-6.3 14.6-9.8c7.6-5.7 10.1-15.7 7.1-24.7l-9.3-28.2c8.8-10.7 16-23 20.9-36.2l29.1-6.1c9.3-1.9 16.7-9.1 17.8-18.5c.8-6.7 1.2-13.5 1.2-20.4s-.4-13.7-1.2-20.4c-1.1-9.4-8.6-16.6-17.8-18.5L583.9 307c-5-13.3-12.1-25.5-20.9-36.2l9.3-28.2c3-9 .5-19-7.1-24.7c-4.7-3.5-9.6-6.8-14.6-9.9l-5.3-3c-5-2.8-10.2-5.3-15.6-7.6c-8.7-3.7-18.6-.9-25 6.2l-19.8 22.2c-6.8-1.1-13.8-1.7-20.9-1.7s-14.1 .6-20.9 1.7l-19.8-22.2c-6.3-7.1-16.2-9.9-25-6.2c-5.3 2.3-10.5 4.8-15.6 7.6l-5.2 3c-5.1 3-9.9 6.3-14.6 9.9c-7.6 5.7-10.1 15.7-7.1 24.7l9.3 28.2c-8.8 10.7-16 23-20.9 36.2L315.1 313c-9.3 1.9-16.7 9.1-17.8 18.5c-.8 6.7-1.2 13.5-1.2 20.4s.4 13.7 1.2 20.4c1.1 9.4 8.6 16.6 17.8 18.5l29.1 6.1c5 13.3 12.1 25.5 20.9 36.2l-9.3 28.2c-3 9-.5 19 7.1 24.7c4.7 3.5 9.5 6.8 14.6 9.8l5.4 3.1c5 2.8 10.2 5.3 15.5 7.6c8.7 3.7 18.6 .9 25-6.2l19.8-22.2c6.8 1.1 13.8 1.7 20.9 1.7s14.1-.6 20.9-1.7l19.8 22.2zM464 400c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z"/></svg>';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  activite: any;
  userInfo: any;
  visibleMemos = true;
  exchange: any;
  classToggled = this.dark.classToggled;
  filterActivity : any;

  constructor(public authService: AuthService, private route: Router, private dialog: MatDialog, private http: HttpClient, private appComponent: AppComponent, public dark: DarkThemeService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('Option', sanitizer.bypassSecurityTrustHtml(Option));
  }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.infoUser();
    this.listActivite();
    this.showExchange();
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

  disableAccount(val: any) {
    this.http.put('http://localhost:8300/user/delete/' + this.authService.getUserConnect().idUser, val).subscribe({
      next: (data) => {
        this.route.navigateByUrl('connexion');
      },
      error: (err) => { console.log(err); }
    });
  }

  showExchange() {
    this.http.get('http://localhost:8300/echange/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.exchange = data;
        console.log(this.exchange)
      },
      error: (err) => { console.log(err) }
    });
  }

  FilterActivity(val: any) {
    this.filterActivity = val;
    this.http.get('http://localhost:8300/activity/search/' + this.authService.getUserConnect().idUser + '/' + val ).subscribe({
      next: (data) => {
        this.activite = data;
      }
    })
  }

}
