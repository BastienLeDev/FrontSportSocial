import { AnimateTimings } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {

  sendmessages : any;
  receivedmessages : any;
  id : any;


  constructor (private http : HttpClient, public authService: AuthService) {}

  ngOnInit() : void {
    this.listSendMessages();
    this.listReceivedMessages();

  }

  listSendMessages(){

  this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser).subscribe({
    next: (data) => {this.sendmessages = data},
    error: (err) => {console.log(err)}
  });

}

  listReceivedMessages(){

  this.http.get('http://localhost:8300/message/wrote/' + this.authService.getUserConnect().idUser).subscribe({
    next: (data) => {this.receivedmessages = data},
    error: (err) => {console.log(err)}
  });

}



}

