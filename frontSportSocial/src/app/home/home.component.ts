import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { DarkThemeService } from '../services/dark-theme.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const information = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg>'
const userOption = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1 .7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-24.9-14.3c-6.9 5.1-14.3 9.4-22.3 12.8l0 30.6c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V454.8c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3 .7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9V218.2zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48s21.5 48 48.1 48s48.1-21.5 48.1-48z"/></svg>';

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
    iconRegistry.addSvgIconLiteral('userOption', sanitizer.bypassSecurityTrustHtml(userOption));
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

  goToProfile() {
    this.route.navigateByUrl('profil');
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
