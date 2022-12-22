import { AnimateTimings } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent implements OnInit {


  sendmessages: any;
  sendmessagesasc: any;
  receivedmessagesasc: any;
  id: any;
  visibleMessage = false;
  friend: any;
  notfriends: any;
  friends: any;
  selectedFriend: any;
  name: any;
  mess: any;
  login: any;
  login2: any;
  jeViensDetreSelectionne: any;
  ami: any;
  user: any;


  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listSendMessages();
    this.listFriends();
    this.listUser();
    this.listNotFriends();
    if (this.login != null) {
      this.listSendAndReceivedMessagesAsc();
    }

  }

  listSendMessages() {

    this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.sendmessages = data },
      error: (err) => { console.log(err) }
    });

  }

  getLogin(val: any) {
    this.login = val;
    if (this.visibleMessage == false) {
      this.visibleMessage = true;
    } else {
      //this.visibleMessage = false;
    }

    if (val != null) {
      this.listSendAndReceivedMessagesAsc();
    } else {
      this.visibleMessage = true;
    }
  }

  listUser() {
    this.http.get('http://localhost:8300/user').subscribe({
      next: (data) => {
        this.user = data
        console.log(this.user);
      },
      error: (err) => { console.log(err) }
    })
  }

  addFriend(val: any) {
    this.http.post('http://localhost:8300/friend', val).subscribe({
      next: (data) => {
        this.friend = data;
        console.log(this.friend);
      },
      error: (err) => { console.log(err) },

    })
  }

  listSendAndReceivedMessagesAsc() {
    this.http.get('http://localhost:8300/message/me/' + this.authService.getUserConnect().idUser + '/' + this.login.idUser + '/combine').subscribe({
      next: (data) => { this.sendmessagesasc = data },
      error: (err) => { console.log(err) }
    });

  }

  listFriends() {

    this.http.get('http://localhost:8300/friend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.friends = data },
      error: (err) => { console.log(err); }

    });
  }

  listNotFriends() {

    this.http.get('http://localhost:8300/notfriend/receiver/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.notfriends = data },
      error: (err) => { console.log(err); }

    });
  }


  sendMess(val: NgForm) {

    let messag = { contentMessage: val.value.message };
    let messagerie = { message: messag };
    this.http.post('http://localhost:8300/message/envoyer/' + this.login.idUser + '/' + this.authService.getUserConnect().idUser, messagerie).subscribe({
      next: (data) => {
        this.mess = data;
        val.reset();
        this.ngOnInit()
      },
      error: (err) => { console.log(err) },



    })

  }

  getLogin2(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        console.log(this.ami);
        this.http.delete('http://localhost:8300/friend/refuse/' + this.ami.idFriend, val).subscribe({

        })
      },
      error: (err) => { console.log(err); },

    })

  }
  getLogin3(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        this.ami.accept = true;
        console.log(this.ami);
        this.http.patch('http://localhost:8300/friend/accept/' + this.ami.idFriend, this.ami).subscribe({

        })
      },
      error: (err) => { console.log(err); },

    })

  }


}


