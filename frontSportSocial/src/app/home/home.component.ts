import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const information = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>'

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
  activiteFriend : any;
  listFriendActivity : Array<any> = [];
  visibleActivity = true;
  visibleEvent = false;
  visibleInformation = true;

  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private appComponent : AppComponent, public dark : DarkThemeService,  iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('information', sanitizer.bypassSecurityTrustHtml(information));
   }

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
    this.listFriendActivity = []
    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.friends = data 
        console.log(this.friends);
        for (let index in this.friends) {
        this.http.get('http://localhost:8300/activity/' + this.friends[index].idUser).subscribe({
          next: (data) => { 
            this.activiteFriend = "";
            this.activiteFriend = data, 
            console.log(this.activiteFriend);
            this.listFriendActivity.push(this.activiteFriend[0])
             },
          error: (err) => { console.log(err); }
        });
      }
      },
      error: (err) => { console.log(err); }

    });
    console.log(this.listFriendActivity);
    
  }

  listEventToCome() {
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => { this.events = data },
      error: (err) => { console.log(err); }
    });
  }

  listEventsFriends() {
    this.http.get('http://localhost:8300/event/friends/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.eventsFriends = data 
      console.log(this.eventsFriends);
      },
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

  goToEvent() {
    this.route.navigateByUrl('event');
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

seeActivity() {
  if (this.visibleActivity == false) {
    this.visibleActivity = true;
    this.visibleEvent = false;
  } else {
    this.visibleEvent = false;
    this.visibleActivity = true;
  }
}

seeEvent() {
  if (this.visibleEvent == false) {
    this.visibleEvent = true;
    this.visibleActivity = false;
  } else {
    this.visibleEvent = true;
    this.visibleActivity = false;
  }
}

seeInformation() {
  if (this.visibleInformation == false) {
    this.visibleInformation = true;
  } else {
    this.visibleInformation = false;
  }
}

}
