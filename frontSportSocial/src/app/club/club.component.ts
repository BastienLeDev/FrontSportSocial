import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewClubComponent } from '../new-club/new-club.component';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  sports: any;
  myClubs: any;
  otherClubs: any;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router, private dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService) { }

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
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });
  }

}