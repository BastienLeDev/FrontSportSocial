import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  visibleCoach = false;
  visibleAvatar = false;
  visibleTokens = false;

  showHideCoach() {
    if (this.visibleCoach == false) {
      this.visibleCoach = true;
    } else {
      this.visibleCoach = false;
    }
  }

  showHideAvatar() {
    if (this.visibleAvatar == false) {
      this.visibleAvatar = true;
    } else {
      this.visibleAvatar = false;
    }
  }


  showHideTokens() {
    if (this.visibleTokens == false) {
      this.visibleTokens = true;
    } else {
      this.visibleTokens = false;
    }
  }

  showHideAll() {
    if (this.visibleCoach == true) {
      this.visibleCoach = false;
    }
    if (this.visibleTokens == true) {
      this.visibleTokens = false;
    }
    if (this.visibleAvatar == true) {
      this.visibleAvatar = false;
    }
  }

  coachs: any;
  avatars: any;

  constructor(private http: HttpClient, public authService: AuthService) { }

  ngOnInit(): void {
    this.listAvatars()
  }

  listCoachs() {

    this.http.get('http://localhost:8300/coach').subscribe({
      next: (data) => { this.coachs = data },
      error: (err) => { console.log(err); }
    });
  }

  listCoachsBySport(val: any) {
    if (val != null) {
      this.http.get('http://localhost:8300/coach/' + val).subscribe({
        next: (data) => {
          this.coachs = data,
            console.log(this.coachs)
        },
        error: (err) => { console.log(err); }
      })
    } else {
      this.listCoachs()
    }

  }

  listAvatars() {
    this.http.get('http://localhost:8300/avatar').subscribe({
      next: (data) => {
        this.avatars = data
      },
      error: (err) => { console.log(err); }
    });
  }

}
