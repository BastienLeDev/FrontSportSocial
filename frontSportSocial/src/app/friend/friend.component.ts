import { AnimateTimings } from '@angular/animations';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { isThisWeek } from 'date-fns';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})


export class FriendComponent implements OnInit {


  sendmessages: any;
  sendmessagesasc: any;
  receivedmessagesasc: any;
  visibleMessage = false;
  visibleTeam = false ;
  notfriends: any;
  friends: any;
  frienship: any;
  name: any;
  mess: any;
  login: any;
  login2: any;
  login3: any;
  ami: any;
  user: any;
  filterUser: any;
  filterFriend: any;
  userInfo: any;
  deletefriend : any;
  classToggled = this.dark.classToggled;
  team : any;


  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog , private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {
    this.listSendMessages();
    this.listFriends();
    this.listNotFriendsDelete();
    this.listNonFriend();
    this.listNotFriends();
    this.listTeam();
    this.infoUser();
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
    this.visibleTeam = false;
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

  getLogin2(val: any) {
    this.login2 = val;
    this.visibleMessage = false;
    this.sendmessagesasc = null;
    if (this.visibleTeam == false) {
      this.visibleTeam = true;
    } else {
      //this.visibleMessage = false;
    }

    if (val != null) {
      this.listSendAndReceivedMessagesAsc();
    } else {
      this.visibleTeam = true;
    }
  }

  listNonFriend() {
    this.http.get('http://localhost:8300/nonfriend/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.user = data
      },
      error: (err) => { console.log(err) }
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

  listNotFriendsDelete() {

    this.http.get('http://localhost:8300/notfriend/receiverdelete/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => { this.deletefriend = data },
      error: (err) => { console.log(err); }

    });
  }

  listTeam() {
    this.http.get('http://localhost:8300/team/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.team = data
      },
      error: (err) => { console.log(err) }
    })
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

  deleteFrienship(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
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
  acceptFrienship(val: any) {
    this.login2 = val;
    this.http.get('http://localhost:8300/select/' + this.authService.getUserConnect().idUser + '/' + this.login2.idUser, val).subscribe({
      next: (data) => {
        this.ami = data;
        this.ami.accept = true;
        console.log(this.ami);
        this.http.patch('http://localhost:8300/friend/accept/' + this.ami.idFriend, this.ami).subscribe({
          next: (data) => {
            this.ngOnInit();
          },
        })
      },
      error: (err) => { console.log(err); },

    })

  }

  FilterUser(val: any) {
    this.filterUser = val;
    this.http.get('http://localhost:8300/user/search/' + val).subscribe({
      next: (data) => {
        console.log(val);
        this.user = data;
      }
    })
  }

  FilterFriend(val: any) {
    this.filterFriend = val;
    this.http.get('http://localhost:8300/friend/search/' + val + '/' + this.authService.getUserConnect().idUser ).subscribe({
      next: (data) => {
        console.log(val);
        this.friends = data;
        console.log(this.friends);
      }
    })
  }

  addFriend(val: any) {
    this.login3 = val
    this.http.post('http://localhost:8300/friend/' + this.authService.getUserConnect().idUser, this.login3).subscribe({
      next: (data) => {
        console.log(this.login3)
        console.log(this.filterUser)
        this.ngOnInit();
        console.log(this.filterUser)
      }
    })

  }

  infoUser() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userInfo = data;
        console.log(this.userInfo)
      },
      error: (err) => { console.log(err); }
    });
  }

}


