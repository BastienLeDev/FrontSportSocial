import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pop-up-quit-club',
  templateUrl: './pop-up-quit-club.component.html',
  styleUrls: ['./pop-up-quit-club.component.css']
})
export class PopUpQuitClubComponent {

  clubToQuit: any;

  constructor(private http: HttpClient, private authService: AuthService, private dialog: MatDialog) { }

  quitClub() {
    this.clubToQuit = this.authService.getClubToQuit();
    this.http.patch('http://localhost:8300/club/desister/' + this.authService.getUserConnect().idUser + '/' + this.clubToQuit, null).subscribe({
      next: (data) => {
        localStorage.removeItem('clubToQuit');
        this.dialog.closeAll();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
