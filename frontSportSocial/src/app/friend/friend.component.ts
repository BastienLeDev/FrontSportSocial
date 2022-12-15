import { AnimateTimings } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {

  sendmessages : any;
  sendmessagesasc : any;
  receivedmessagesasc : any;
  id : any;
  visibleMessage = false;
  friend : any;
  friends: any;
  selectedFriend : any;
  name: any;
  mess : any;
  

  constructor (private http : HttpClient, public authService: AuthService, private route: Router) {}

  ngOnInit() : void {
    this.listSendMessages();
    this.listFriends();

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

  this.listSendAndReceivedMessagesAsc();
  /* this.listReceivedMessagesAsc(); */
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

listSendAndReceivedMessagesAsc(){
  this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser +'/' +  this.name.message.expediteurMessage.idUser +'/combine').subscribe({
    next: (data) => {this.sendmessagesasc = data},
    error: (err) => {console.log(err)}
  });

}
/*
listReceivedMessagesAsc(){

  this.http.get('http://localhost:8300/message/me/' + this.name.message.expediteurMessage.idUser +'/' + this.authService.getUserConnect().idUser +'/asc').subscribe({
    next: (data) => {this.receivedmessagesasc = data},
    error: (err) => {console.log(err)}
  });

}
*/

listFriends() {



  this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
    next: (data) => { this.friends = data },
    error: (err) => { console.log(err); }

  });
}

sendMess(val : any) {

  let messag = {contentMessage: val.message};
  let messagerie = {message: messag};

  this.http.post('http://localhost:8300/message/envoyer/' + this.name.message.expediteurMessage.idUser +'/' +  this.authService.getUserConnect().idUser , messagerie).subscribe({
    next: (data) => {
      this.mess = data;
      this.ngOnInit();
    },
    error: (err) => { console.log(err) },

  })

}


}

