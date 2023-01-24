import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClubsService } from '../services/clubs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DarkThemeService } from '../services/dark-theme.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddPostComponent } from '../pop-up-add-post/pop-up-add-post.component';

const addFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
const waitingFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c20.6 0 40.4 3.5 58.8 9.9C323 331 320 349.1 320 368c0 59.5 29.5 112.1 74.8 144H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM640 368c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM496 288c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H512V304c0-8.8-7.2-16-16-16z"/></svg>';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubsService, private http: HttpClient, private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private route: Router, public dark: DarkThemeService, public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral('add-friend', sanitizer.bypassSecurityTrustHtml(addFriendIcon));
    iconRegistry.addSvgIconLiteral('wait-friend', sanitizer.bypassSecurityTrustHtml(waitingFriendIcon));
  };

  idClub = this.clubService.getClubToSee().idClub;
  club = this.clubService.getClubToSee();
  myFriends: any;
  nonFriends: any;
  amiDemand: any;
  askedFriends: any;
  classToggled = this.dark.classToggled;
  feed: any;
  comments: any;
  idPostCom: any;
  commentsNumber: any;
  idComCom: any;
  commmentsComment: any;
  varCheckLike: any;
  listLikePosts: Array<any> = [];
  check = false;
  boolLike: any;

  listLikeComment: Array<any> = [];
  checkComment = false;
  boolLikeComment: any;

  commentOpen = false;

  ngOnInit(): void {
    this.listFriendsInClub();
    this.listNonFriendsInClub();
    this.listAskedFriends();
    this.listPost();
  }

  listFriendsInClub() {
    this.http.get('http://localhost:8300/club/amis/' + this.authService.getUserConnect().idUser + '/' + this.idClub).subscribe({
      next: (data) => {
        this.myFriends = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  listNonFriendsInClub() {
    this.http.get('http://localhost:8300/club/nonamis/' + this.authService.getUserConnect().idUser + '/' + this.idClub).subscribe({
      next: (data) => {
        this.nonFriends = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  addFriend(val: any) {
    this.amiDemand = val
    this.http.post('http://localhost:8300/friend/' + this.authService.getUserConnect().idUser, this.amiDemand).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }
    })

  }

  listAskedFriends() {
    this.http.get('http://localhost:8300/club/amisdemandes/'
      + this.authService.getUserConnect().idUser + '/' + this.idClub).subscribe({
        next: (data) => {
          this.askedFriends = data;
        },
        error: (err) => { console.log(err); }
      });
  }

  goToFriends() {
    this.route.navigateByUrl('friend');
  }

  listPost() {
    this.http.get('http://localhost:8300/club/posts/' + this.idClub).subscribe({
      next: (data) => {
        this.feed = data;
        for (let index in this.feed) {
          let likePost = {} as any;
          likePost.idPost = this.feed[index].idPost;
          this.http.get('http://localhost:8300/club/posts/checkLike/' + this.feed[index].idPost + '/' + this.authService.getUserConnect().idUser).subscribe({
            next: (data) => {
              this.boolLike = data;
              likePost.boolLike = this.boolLike;

              if (this.listLikePosts.length == 0) {
                this.listLikePosts.push(likePost);
              }
              else {
                this.listLikePosts.forEach(element => {
                  if (element.idPost == likePost.idPost && element.boolLike == likePost.boolLike) {
                    this.check = true;
                  }
                  else if (element.idPost == likePost.idPost && element.boolLike != likePost.boolLike) {
                    element.boolLike = likePost.boolLike;
                    this.check = true;
                  }
                });
                if (this.check == false) {
                  this.listLikePosts.push(likePost);
                }
              }
            },
            error: (err) => { console.log(err); }
          });

        }
      },
      error: (err) => { console.log(err); }
    });
  }

  listComments(idComment: any) {
    this.idPostCom = idComment;
    this.commentOpen = true;
    this.http.get('http://localhost:8300/club/posts/comments/' + idComment).subscribe({
      next: (data) => {
        this.comments = data;
        for (let index in this.comments) {
          let likeComment = {} as any;
          likeComment.idComment = this.comments[index].idComment;
          this.http.get('http://localhost:8300/comments/checkLike/' + this.authService.getUserConnect().idUser + '/' + this.comments[index].idComment ).subscribe({
            next: (data) => {
              this.boolLikeComment = data;
              likeComment.boolLike = this.boolLikeComment;

              if (this.listLikeComment.length == 0) {
                this.listLikeComment.push(likeComment);
              }
              else {
                this.listLikeComment.forEach(element => {
                  if (element.idComment == likeComment.idComment && element.boolLike == likeComment.boolLike) {
                    this.checkComment = true;
                  }
                  else if (element.idComment == likeComment.idComment && element.boolLike != likeComment.boolLike) {
                    element.boolLike = likeComment.boolLike;
                    this.checkComment = true;
                  }
                });
                if (this.checkComment == false) {
                  this.listLikeComment.push(likeComment);
                }
              }
            },
            error: (err) => { console.log(err); }
          });

        }
      },
      error: (err) => { console.log(err); }
    });
  }

  listCommentsInComment(idComment: any) {
    console.log(idComment);
    this.idComCom = idComment;
    this.http.get('http://localhost:8300/club/posts/comments/comments/' + idComment).subscribe({
      next: (data) => {
        this.commmentsComment = data;
      },
      error: (err) => { console.log(err); }
    });
  }

  likePost(idPost: any) {
    this.http.patch('http://localhost:8300/club/posts/like/' + idPost + '/' + this.authService.getUserConnect().idUser, null).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }
    });
  }

  unlikePost(idPost: any) {
    this.http.patch('http://localhost:8300/club/posts/unlike/' + idPost + '/' + this.authService.getUserConnect().idUser, null).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }
    });
  }

  postComment(val: NgForm, idPost: any) {
    this.http.post('http://localhost:8300/post/comment/' + this.authService.getUserConnect().idUser + '/' + idPost, val).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.listComments(idPost);
      },
      error: (err) => { console.log(err); }
    });
  }

  openNewPostModal() {
    const dialogRef = this.dialog.open(PopUpAddPostComponent);
    dialogRef.afterClosed().subscribe(() => { //Pour lancer des fonctions lorsqu'on ferme le popup
      this.ngOnInit(); //pour reload les Posts
    });
  }

  likeComment(idComment: any) {
    this.http.patch('http://localhost:8300/comment/like/'+ this.authService.getUserConnect().idUser + '/' + idComment  , null).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit();
        this.listComments(idComment);
      },
      error: (err) => { console.log(err); }
    });
  }

  unlikeComment(idComment: any) {
    this.http.patch('http://localhost:8300/comment/unlike/'+ this.authService.getUserConnect().idUser + '/' + idComment  , null).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit();
        this.listComments(idComment);
      },
      error: (err) => { console.log(err); }
    });
  }



}


