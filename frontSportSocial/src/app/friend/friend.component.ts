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

  messages : any;
  id : any;


  constructor (private http : HttpClient, public authService: AuthService) {}

  ngOnInit() : void {
    this.listMessages();

  }

  listMessages(){

  this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser).subscribe({
    next: (data) => {this.messages = data},
    error: (err) => {console.log(err)}
  });

}

}

