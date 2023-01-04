import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewClubComponent } from '../new-club/new-club.component';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { PopUpQuitClubComponent } from '../pop-up-quit-club/pop-up-quit-club.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  sports: any;
  myClubs: any;
  otherClubs: any;
  classToggled = this.dark.classToggled;
  clubToJoin: any;




  constructor(private http: HttpClient, private authService: AuthService, private route: Router, public dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService) { }


  openDialog(val: any) {
    this.authService.setClubToQuit(val.idClub);
    const dialogRef = this.dialog.open(PopUpQuitClubComponent, { restoreFocus: false });
    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }


  ngOnInit(): void {
    this.listSport();
    this.listMyClubs();
    this.listOtherClubs()
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
  }


  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });

  }

  listMyClubs() {
    this.http.get('http://localhost:8300/mesClubs/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.myClubs = data;
        console.log(this.myClubs);

      },
      error: (err) => { console.log(err); }
    });
  }

  listOtherClubs() {
    this.http.get('http://localhost:8300/autresClubs/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.otherClubs = data;
        console.log(this.otherClubs);

      },
      error: (err) => { console.log(err); }
    });
  }

  openNewClubModal() {
    const dialogRef = this.dialog.open(NewClubComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les Clubs
    });
  }

  joinClub(val: any) {
    this.clubToJoin = val;
    this.http.patch('http://localhost:8300/club/rejoindre/' + this.authService.getUserConnect().idUser + '/' + this.clubToJoin.idClub, null).subscribe({
      next: (data) => {
        this.listOtherClubs();
        this.ngOnInit();

        console.log(this.myClubs);
      },
      error: (err) => { console.log(err); }
    })
  }


}