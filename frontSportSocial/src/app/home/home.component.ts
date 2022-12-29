import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';

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
  login : any;
  ami : any;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private appComponent : AppComponent, public dark : DarkThemeService) { }

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

  deleteFrienship(val: any) {
    this.login = val;
    this.http.get('http://localhost:8300/selectaccepted/' + this.authService.getUserConnect().idUser + '/' + this.login.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        console.log(this.ami);
         this.http.delete('http://localhost:8300/friend/refuse/' + this.ami.idFriend, val).subscribe({
          next: (data) => {
           this.ngOnInit();
          },
        })
      },
      error: (err) => { console.log(err); },

    })


}
}
