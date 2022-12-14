import { AnimateTimings } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {

  messages : any;


  constructor (private http : HttpClient) {}

  ngOnInit() : void {
    this.http.get('http://localhost:8300/message/me/6').subscribe({
      next: (data) => {this.messages = data},
      error: (err) => {console.log(err)}
    })
  }



}


