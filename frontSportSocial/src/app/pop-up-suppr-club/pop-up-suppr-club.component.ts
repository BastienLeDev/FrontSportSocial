import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { ClubsService } from '../services/clubs.service';

@Component({
  selector: 'app-pop-up-suppr-club',
  templateUrl: './pop-up-suppr-club.component.html',
  styleUrls: ['./pop-up-suppr-club.component.css']
})
export class PopUpSupprClubComponent {

  clubToDelete: any;

  constructor(private http: HttpClient, private clubService: ClubsService, private authService: AuthService, private dialog: MatDialog) { }

  deleteClub() {
    this.clubToDelete = this.clubService.getClubToDelete();
    this.http.delete('http://localhost:8300/club/delete/' + this.clubToDelete.idClub).subscribe({
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
