import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: any;
  friends: any;
  id: any;
  activite: any;
  eventsFriends: any;
  myEvents: any;

  constructor(private http: HttpClient, public authService: AuthService, private route: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }

    this.listFriends();
    this.listActivite();

    this.listEventToCome();
    this.listEventsFriends();
    this.listMyEvents();

  }

  listActivite() {

    this.http.get('http://localhost:8300/activity/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.activite = data, console.log(this.activite); },

      error: (err) => { console.log(err); }

    });
  }
  listFriends() {



    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.friends = data },
      error: (err) => { console.log(err); }

    });
  }

  listEventToCome() {
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => { this.events = data },
      error: (err) => { console.log(err); }
    });
  }

  listEventsFriends() {
    this.http.get('http://localhost:8300/event/friends/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.eventsFriends = data },
      error: (err) => { console.log(err); }
    });
  }

  listMyEvents() {
    this.http.get('http://localhost:8300/event/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.myEvents = data },
      error: (err) => { console.log(err); }
    });

  }

  goToRanking() {
    this.route.navigateByUrl('ranking');
  }


}
