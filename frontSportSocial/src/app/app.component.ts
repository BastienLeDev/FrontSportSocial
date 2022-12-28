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


  constructor(public authService: AuthService, public darkThem : DarkThemeService,) { };

  ngOnInit () {
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
  

}
