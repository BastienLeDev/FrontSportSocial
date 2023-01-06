import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClubsService } from '../services/clubs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

const addFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubsService, private http: HttpClient, private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIconLiteral('add-friend', sanitizer.bypassSecurityTrustHtml(addFriendIcon));
  };

  idClub = this.clubService.getClubToSee().idClub;
  club = this.clubService.getClubToSee();
  myFriends: any;
  nonFriends: any;

  ngOnInit(): void {
    this.listFriendsInClub();
    this.listNonFriendsInClub();
  }

  listFriendsInClub(){
    this.http.get('http://localhost:8300/club/amis/' + this.authService.getUserConnect().idUser + '/' + this.idClub) .subscribe({
      next: (data) => {
        this.myFriends = data;
        console.log(this.myFriends);

      },
      error: (err) => { console.log(err); }
    });
  }

  listNonFriendsInClub(){
    this.http.get('http://localhost:8300/club/nonamis/' + this.authService.getUserConnect().idUser + '/' + this.idClub) .subscribe({
      next: (data) => {
        this.nonFriends = data;
        console.log(this.nonFriends);

      },
      error: (err) => { console.log(err); }
    });
  }


}
