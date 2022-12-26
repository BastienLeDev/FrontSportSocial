import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent {
  title = 'frontSportSocial';
  dark = false;  

  constructor(public authService: AuthService) { };

  toggle = true;
  status = 'Enable'; 


enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? '' : '';
}

darkMode() {
  if (this.dark == false) {
    this.dark = true;
  } else {
    this.dark = false;
  }
}

}
