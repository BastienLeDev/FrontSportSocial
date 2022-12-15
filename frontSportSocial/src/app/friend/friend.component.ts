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
  sendmessagesasc : any;
  receivedmessages : any;
  receivedmessagesasc : any;
  id : any;
  visibleMessage = false;
  friend : any;
  selectedFriend : any;
  name: any;
  

  constructor (private http : HttpClient, public authService: AuthService) {}

  ngOnInit() : void {
    this.listSendMessages();

  }

  listSendMessages(){

  this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser).subscribe({
    next: (data) => {this.sendmessages = data},
    error: (err) => {console.log(err)}
  });

}


showHideMessage(val : any) {
  this.name = val;
  if (this.visibleMessage == false) {
    this.visibleMessage = true;
  } else {
    this.visibleMessage = false;
  }

  this.listSendMessagesAsc();
  this.listReceivedMessagesAsc();
}

addFriend(val :any) {
  this.http.post('http://localhost:8300/friend', val).subscribe({
    next: (data) => {
      this.friend = data;
      console.log(this.friend);
    },
    error : (err) => {console.log(err)},

  })
}

listSendMessagesAsc(){

  this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser +'/' +  this.name.message.expediteurMessage.idUser +'/asc').subscribe({
    next: (data) => {this.sendmessagesasc = data},
    error: (err) => {console.log(err)}
  });

}

listReceivedMessagesAsc(){

  this.http.get('http://localhost:8300/message/me/' + this.name.message.expediteurMessage.idUser +'/' + this.authService.getUserConnect().idUser +'/asc').subscribe({
    next: (data) => {this.receivedmessagesasc = data},
    error: (err) => {console.log(err)}
  });

}


}

