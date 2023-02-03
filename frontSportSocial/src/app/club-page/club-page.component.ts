import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ClubsService } from '../services/clubs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router, withInMemoryScrolling } from '@angular/router';
import { DarkThemeService } from '../services/dark-theme.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopUpAddPostComponent } from '../pop-up-add-post/pop-up-add-post.component';

const addFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>';
const waitingFriendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128s-57.3 128-128 128zm-45.7 48h91.4c20.6 0 40.4 3.5 58.8 9.9C323 331 320 349.1 320 368c0 59.5 29.5 112.1 74.8 144H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM640 368c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM496 288c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H512V304c0-8.8-7.2-16-16-16z"/></svg>';
const liked = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>'
const unliked = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>'
const send = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>';
const letComment = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 448c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32zm160-32c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubsService, private http: HttpClient, private authService: AuthService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private route: Router, public dark: DarkThemeService, public dialog: MatDialog) {
    iconRegistry.addSvgIconLiteral('add-friend', sanitizer.bypassSecurityTrustHtml(addFriendIcon));
    iconRegistry.addSvgIconLiteral('wait-friend', sanitizer.bypassSecurityTrustHtml(waitingFriendIcon));
    iconRegistry.addSvgIconLiteral('liked', sanitizer.bypassSecurityTrustHtml(liked));
    iconRegistry.addSvgIconLiteral('unliked', sanitizer.bypassSecurityTrustHtml(unliked));
    iconRegistry.addSvgIconLiteral('send', sanitizer.bypassSecurityTrustHtml(send));
    iconRegistry.addSvgIconLiteral('letComment', sanitizer.bypassSecurityTrustHtml(letComment));
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

  listLikeCommentComment: Array<any> = [];
  checkCommentComment = false;
  boolLikeCommentComment: any;


  ngOnInit(): void {
    this.listFriendsInClub();
    this.listNonFriendsInClub();
    this.listAskedFriends();
    this.listPost();
    this.listComments(this.idPostCom);
    this.listCommentsInComment(this.idComCom);
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

  listComments(idPost: any) {
    this.idPostCom = idPost;
    this.listLikeComment = [];
    console.log(this.idPostCom)
    this.http.get('http://localhost:8300/club/posts/comments/' + idPost).subscribe({
      next: (data) => {
        this.comments = data;
        for (let index in this.comments) {
          let likeComment = {} as any;
          likeComment.idComment = this.comments[index].idComment;
          this.http.get('http://localhost:8300/comments/checkLike/' + this.authService.getUserConnect().idUser + '/' + this.comments[index].idComment).subscribe({
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
    this.listLikeCommentComment = [];
    console.log(this.idComCom);
    this.http.get('http://localhost:8300/club/posts/comments/comments/' + idComment).subscribe({
      next: (data) => {
        this.commmentsComment = data;
        for (let index in this.commmentsComment) {
          let likeCommentComment = {} as any;
          likeCommentComment.idComment = this.commmentsComment[index].idComment;
          this.http.get('http://localhost:8300/comments/checkLike/' + this.authService.getUserConnect().idUser + '/' + this.commmentsComment[index].idComment).subscribe({
            next: (data) => {
              this.boolLikeCommentComment = data;
              likeCommentComment.boolLike = this.boolLikeCommentComment;

              if (this.listLikeCommentComment.length == 0) {
                this.listLikeCommentComment.push(likeCommentComment);
              }
              else {
                this.listLikeCommentComment.forEach(element => {
                  if (element.idComment == likeCommentComment.idComment && element.boolLike == likeCommentComment.boolLike) {
                    this.checkCommentComment = true;
                  }
                  else if (element.idComment == likeCommentComment.idComment && element.boolLike != likeCommentComment.boolLike) {
                    element.boolLike = likeCommentComment.boolLike;
                    this.checkCommentComment = true;
                  }
                });
                if (this.checkCommentComment == false) {
                  this.listLikeCommentComment.push(likeCommentComment);
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
    this.http.patch('http://localhost:8300/comment/like/' + this.authService.getUserConnect().idUser + '/' + idComment, null).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit();

      },
      error: (err) => { console.log(err); }
    });
  }

  unlikeComment(idComment: any) {
    this.http.patch('http://localhost:8300/comment/unlike/' + this.authService.getUserConnect().idUser + '/' + idComment, null).subscribe({
      next: (data) => {
        console.log(data);
        this.ngOnInit();
      },
      error: (err) => { console.log(err); }
    });
  }

  commentComment(val: NgForm, idComment: any) {
    this.http.post('http://localhost:8300/comment/comment/' + this.authService.getUserConnect().idUser + '/' + idComment, val).subscribe({
      next: (data) => {
        this.ngOnInit();

      },
      error: (err) => { console.log(err); }
    });
  }

  respondComment(val: any, idComment: any, idCommentComment: any){
    this.http.post('http://localhost:8300/comment/response/' + this.authService.getUserConnect().idUser + '/' + idComment + '/' + idCommentComment, val).subscribe({
      next: (data) => {
        this.ngOnInit();

      },
      error: (err) => { console.log(err); }
    });
  }


}


