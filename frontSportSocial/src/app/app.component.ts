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
  status = 'Enable';


  constructor(public authService: AuthService, public darkThem : DarkThemeService) { };


  darkTheme() {
    this.classToggled = !this.classToggled;
    if (this.classToggled == true) {
    this.darkThem.darkTheme();
  }
  if (this.classToggled == false) {
    this.darkThem.darkThemeOff();
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
