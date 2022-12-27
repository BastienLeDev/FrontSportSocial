import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent {
  title = 'frontSportSocial';
  dark: boolean = false;

  constructor(public authService: AuthService ) { };

  classToggled: boolean = false;
  status = 'Enable';


  darkTheme() {
    this.classToggled = !this.classToggled;

  }

  darkMode() {
    if (this.dark == false) {
      this.dark = true;
    } else {
      this.dark = false;
    }
  }

}
