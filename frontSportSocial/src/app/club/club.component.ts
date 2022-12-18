import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  sports: any;
  clubs: any;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.listSport();
    this.listClubs();
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

  listClubs() {
    this.http.get('http://localhost:8300/club').subscribe({
      next: (data) => {
        this.clubs = data;
        console.log(this.clubs);
      },
      error: (err) => { console.log(err); }
    });
  }
}