import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewEventComponent } from '../new-event/new-event.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  events: any;
  event: any;
  sports: any;
  friends: any;
  usersParticipating: any;
  dummy: any;
  userParticipateEvent = false;

  constructor(private http: HttpClient, private route: Router, private dialog: MatDialog, public authService: AuthService) { }

  ngOnInit(): void {
    this.listEventToCome();
    this.listSport();
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    this.listFriends()
  }

  listEventToCome() {
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => {
        this.events = data;
        console.log(this.events)
      },
      error: (err) => { console.log(err); }
    });
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

  openNewEventModal() {
    const dialogRef = this.dialog.open(NewEventComponent);
  }

  addEventToUser(idEvent: bigint) {
    this.http.patch('http://localhost:8300/event/participer/' + this.authService.getUserConnect().idUser + '/' + idEvent, null).subscribe({
      next: (data) => { this.ngOnInit },
      error: (err) => { console.log(err) },
    });
    window.location.reload();
    //this.userParticipate(idEvent);
  }

  removeUserFromEvent(idEvent: bigint) {
    this.http.patch('http://localhost:8300/event/desister/' + this.authService.getUserConnect().idUser + '/' + idEvent, null).subscribe({
      next: (data) => { this.ngOnInit },
      error: (err) => { console.log(err) },
    });
    window.location.reload();

  }

  listFriends() {

    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.friends = data },
      error: (err) => { console.log(err); }

    });
  }

  getUsersOfEvent(idEvent: bigint) {
    this.http.get('user/participateEvent/' + idEvent).subscribe({
      next: (data) => { this.usersParticipating = data },
      error: (err) => { console.log(err); }
    })
  }

  verifUser(event: any) {
    let exist = false;
    event.participants.forEach((p: any) => {
      if (p.idUser == this.authService.getUserConnect().idUser) {
        exist = true;
      }
    });

    return exist;
  }


}
