import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewClubComponent } from '../new-club/new-club.component';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  sports: any;
  clubs: any;
  classToggled : boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router, private dialog: MatDialog,private appComponent : AppComponent) { }

  ngOnInit(): void {
    this.listSport();
    this.listClubs();
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.darkTheme();
  }

  darkTheme() {
    if (!this.appComponent.classToggled) {
      this.classToggled = this.classToggled; 
    }
    else 
    {
      this.classToggled = !this.classToggled; 
    }
  }


  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });

  }

  listClubs() {
    this.http.get('http://localhost:8300/club').subscribe({
      next: (data) => {
        this.clubs = data;
        console.log(this.clubs);
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