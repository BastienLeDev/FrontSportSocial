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
import { PopUpCreateTeamComponent } from '../pop-up-create-team/pop-up-create-team.component';

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
  visibleTeam = false;
  visibleOption = false;
  visibleTeamTitle = false;
  visibleTeamMember = false;
  visibleAddTeamMember = false;
  notfriends: any;
  friends: any;
  frienship: any;
  name: any;
  mess: any;
  login: any;
  login2: any;
  login3: any;
  login4: any;
  login5: any;
  login6: any;
  ami: any;
  user: any;
  filterUser: any;
  filterFriend: any;
  filterTeam : any;
  userInfo: any;
  deletefriend: any;
  classToggled = this.dark.classToggled;
  team: any;
  teammessages: any;
  teammember: any;
  nonteammember: any;
  member: any;


  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog, private appComponent: AppComponent, public dark: DarkThemeService) { }

  ngOnInit(): void {
    this.listSendMessages();
    this.listFriends();
    this.listNotFriendsDelete();
    this.listNonFriend();
    this.listNotFriends();
    this.listTeam();
    this.infoUser();
    if (this.login4 != null) {this.listTeamMember();}
    if (this.login4 != null) {this.listNonTeamMember();}
    if (this.login != null) {
      this.listSendAndReceivedMessagesAsc();
    }
    if (this.login4 != null) {
      this.listTeamMessages();
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
    this.login4 = val;
    this.visibleMessage = false;
    this.visibleOption = false;
    this.visibleTeamTitle = false;
    this.visibleTeamMember = false;
    this.visibleAddTeamMember = false;
    this.sendmessagesasc = null;
    if (this.visibleTeam == false) {
      this.visibleTeam = true;

    } else {
      //this.visibleMessage = false;
    }

    if (val != null) {
      this.listTeamMessages();
    } else {
      this.visibleTeam = true;
    }

  }

  messageOption() {
    if (this.visibleOption == false) {
      this.visibleOption = true;
    } else {
      this.visibleOption = false;
      this.visibleTeamTitle = false;
      this.visibleTeamMember = false;
      this.visibleAddTeamMember = false;
    }
  }

  newTeamTitle() {
    if (this.visibleTeamTitle == false) {
      this.visibleTeamTitle = true;
      this.visibleTeamMember = false;
      this.visibleAddTeamMember = false;
    } else {
      this.visibleTeamTitle = false;
    }
  }

  seeTeamMember() {
    this.member = this.login4;
    this.listTeamMember();
    if (this.visibleTeamMember == false) {
      this.visibleTeamMember = true;
      this.visibleTeamTitle = false;
      this.visibleAddTeamMember = false;
    } else {
      this.visibleTeamMember = false;
    }
  }

  addTeamMember() {
    this.listNonTeamMember();
    if (this.visibleAddTeamMember == false) {
      this.visibleAddTeamMember = true;
      this.visibleTeamTitle = false;
      this.visibleTeamMember = false;
    } else {
      this.visibleAddTeamMember = false;
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
      next: (data) => {
        this.sendmessagesasc = data
      },
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

  listTeamMessages() {
    this.http.get('http://localhost:8300/team/message/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.teammessages = data
      },
      error: (err) => { console.log(err) }
    });

  }

  listTeamMember() {
    this.http.get('http://localhost:8300/team/member/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.teammember = data
      },
      error: (err) => { console.log(err) }
    });

  }

  listNonTeamMember() {
    this.http.get('http://localhost:8300/team/nonmember/' + this.login4.idTeam).subscribe({
      next: (data) => {
        this.nonteammember = data
      },
      error: (err) => { console.log(err) }
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

  sendTeamMess(val: NgForm) {

    let messag = { contentMessage: val.value.message };
    this.http.post('http://localhost:8300/team/envoyer/' + this.login4.idTeam + '/' + this.authService.getUserConnect().idUser, messag).subscribe({
      next: (data) => {
        this.mess = data;
        val.reset();
        this.ngOnInit()
      },
      error: (err) => { console.log(err) },



    })

  }

  renameTeam(val: NgForm) {
    let title = { title: val.value.message };
    this.http.post('http://localhost:8300/team/rename/' + this.login4.idTeam, title).subscribe({
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
    this.http.get('http://localhost:8300/nonfriend/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.user = data;
      }
    })
  }

  FilterFriend(val: any) {
    this.filterFriend = val;
    this.http.get('http://localhost:8300/friend/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.friends = data;
      }
    })
  }

  FilterTeam(val: any) {
    this.filterTeam = val;
    this.http.get('http://localhost:8300/team/search/' + val + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.team = data;
      }
    })
  }

  addFriend(val: any) {
    this.login3 = val
    this.http.post('http://localhost:8300/friend/' + this.authService.getUserConnect().idUser, this.login3).subscribe({
      next: (data) => {
        this.ngOnInit();
      }
    })

  }

  infoUser() {
    this.http.get('http://localhost:8300/user/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.userInfo = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  quitTeam() {
    this.http.delete('http://localhost:8300/team/quit/' + this.login4.idTeam + '/' + this.authService.getUserConnect().idUser).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();
    this.visibleMessage = false;
    this.visibleTeam = false;

  }

  deleteTeamMember(val: any) {
    this.login5 = val;
    this.http.delete('http://localhost:8300/team/quit/' + this.login4.idTeam + '/' + this.login5.idUser).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();

  }

  addTeamMembers(val: any) {
    this.login6 = val;
    this.http.post('http://localhost:8300/team/addmember/' + this.login4.idTeam + '/' + this.login6.idUser, val).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();

  }

  openNewTeamModal() {
    const dialogRef = this.dialog.open(PopUpCreateTeamComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les cards event => affiche le nouvel event sans reload page
    });

  }

  deleteTeam() {
    this.http.delete('http://localhost:8300/team/delete/' + this.login4.idTeam ).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); },
    })
    this.ngOnInit();
    this.visibleMessage = false;
    this.visibleTeam = false;
  }

}


