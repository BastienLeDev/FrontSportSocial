import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { DarkThemeService } from './services/dark-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers :[HomeComponent],

})


export class AppComponent {
  title = 'frontSportSocial';
  dark: boolean = false;
  classToggled: boolean = false;
  vrai = 1;
  status = 'Enable';
  userInfo : any;


  constructor(public authService: AuthService, private http: HttpClient, public darkThem : DarkThemeService , private route: Router) { };

  ngOnInit () {
    this.infoUser();
    if (localStorage.getItem('active') !== null)
    this.classToggled = !this.classToggled;
    if (this.classToggled == true) {
    this.darkThem.darkTheme();
    this.dark = true;
  }
  if (this.classToggled == false) {
    this.darkThem.darkThemeOff();
  }
  }

  darkTheme() {
    localStorage.setItem('active', '1');
    if (localStorage.getItem('active') !== null) {
    this.classToggled = !this.classToggled;
    if (this.classToggled == true) {
      this.darkThem.darkTheme();
      window.location.reload()
      }
    if (this.classToggled == false) {
      this.darkThem.darkThemeOff();
      localStorage.removeItem('active');
      window.location.reload()
     }
    }
  }

  darkMode() {
    if (this.dark == false) {
      this.dark = true;
    } else {
      this.dark = false;
    }
  }

  goToMap() {;
    this.route.navigateByUrl('map');
  }

  goToFriend() {;
    this.route.navigateByUrl('friend');
  }

  goToEvent() {;
    this.route.navigateByUrl('event');
  }

  goToSchedule() {;
    this.route.navigateByUrl('schedule');
  }

  goToClub() {;
    this.route.navigateByUrl('club');
  }
  
  goToHome() {;
    this.route.navigateByUrl('home');
  }

  goToShopAvatar() {
    localStorage.removeItem('coach');
    localStorage.removeItem('tokens');
    localStorage.setItem('avatar', '1');
    this.route.navigateByUrl('shop');
  }

  goToShopTokens() {
    localStorage.removeItem('avatar');
    localStorage.removeItem('coach');
    localStorage.setItem('tokens', '1');
    this.route.navigateByUrl('shop');
  }

  goToShopCoach() {
    localStorage.removeItem('avatar');
    localStorage.removeItem('tokens');
    localStorage.setItem('coach', '1');
    this.route.navigateByUrl('shop');
  }

  goToProfil() {
    this.route.navigateByUrl('profil');
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
