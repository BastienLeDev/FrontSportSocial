import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-profil',
  templateUrl: './pop-up-profil.component.html',
  styleUrls: ['./pop-up-profil.component.css']
})
export class PopUpProfilComponent {

  constructor(private http: HttpClient, private route: Router, public authService: AuthService, private dialog: MatDialog) { }

  user: any;
  isChecked = true;

  modifInfosUser(val: any) {
    console.log(val)
    if (this.isChecked == true) {
      val.coachUser = true;
      console.log(val.coachUser)
      this.http.put('http://localhost:8300/user/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('profil');
        },
        error: (err) => { console.log(err) },

      })
    }
    else {
      val.coachUser = false;
      this.http.put('http://localhost:8300/user/' + this.authService.getUserConnect().idUser, val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('profil');
        },
        error: (err) => { console.log(err) },

      })
    }

  }




  goToProfile() {
    this.dialog.closeAll();
    history.go(-1);
  }


}
