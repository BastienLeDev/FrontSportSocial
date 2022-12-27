import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})


export class ShopComponent implements OnInit {

  visibleCoach = false;
  visibleAvatar = false;
  visibleTokens = false;
  coachs: any;
  avatars: any;
  msgErr = '';
  achat = 'Acheter';
  transaction: any;
  transactio: any;
  userInfo: any;
  classToggled : boolean = false;


  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private appComponent : AppComponent) { }

  ngOnInit(): void {
    this.darkTheme();
    this.listCoachs();
    this.listAvatars();
    this.infoUser();
    this.verifAvatarAchete(this.avatars);
    
  }


  darkTheme() {
    if (!this.appComponent.classToggled) {
      this.classToggled = this.classToggled; 
    }
    else 
    {
      this.classToggled = !this.classToggled; 
    }
  }


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


  listCoachs() {
    this.http.get('http://localhost:8300/coach').subscribe({
      next: (data) => {
        this.coachs = data
      },
      error: (err) => { console.log(err); }
    });
  }

  listCoachsBySport(val: any) {
    this.http.get('http://localhost:8300/coach/' + val).subscribe({
      next: (data) => {
        this.coachs = data,
          console.log(this.coachs)
      },
      error: (err) => { console.log(err); }
    })
  }

  listAvatars() {
    this.http.get('http://localhost:8300/avatar').subscribe({
      next: (data) => {
        this.avatars = data
      },
      error: (err) => { console.log(err); }
    });
  }

  listAvatarDescription(val: any) {
    this.http.get('http://localhost:8300/avatar/' + val).subscribe({
      next: (data) => {
        this.avatars = data
      },
      error: (err) => { console.log(err); }
    })
  }

  achatTokenEuro(val: any) {
    this.http.get('http://localhost:8300/boutique/achat/euro/' + this.authService.getUserConnect().idUser + '/' + val).subscribe({
      next: (data) => {
        this.transaction = data
      },
      error: (err) => { console.log(err); }
    })

  }

  achatToken(val: any) {
    this.http.get('http://localhost:8300/boutique/achatToken/' + this.authService.getUserConnect().idUser + '/' + val).subscribe({
      next: (data) => {
        this.transaction = data
      },
      error: (err) => { console.log(err); }
    })

  }

  achatProduit(val: any) {
    this.http.get(`http://localhost:8300/boutique/achat/${this.authService.getUserConnect().idUser}/${val}`).subscribe({
      next: (data) => {
        this.transactio = data
        if (this.transactio.validation == true) {
          this.msgErr = "La transaction est bien effectuée"
          this.achat = "fas fa-check"
          this.ngOnInit();
        } else {
          this.msgErr = "Transaction refusée"
        }
      },
      error: (err) => { console.log(err); }
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

  verifAvatarAchete(avatar: any) {
    let exist = false;
    this.userInfo.inventaire.forEach((a: any) => {
      if (avatar.imageProduit.idImage == a) {
        exist = true;
      }
    });

    return exist;
  }


}
