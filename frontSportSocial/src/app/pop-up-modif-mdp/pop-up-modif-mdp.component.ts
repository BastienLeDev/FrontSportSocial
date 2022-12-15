import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pop-up-modif-mdp',
  templateUrl: './pop-up-modif-mdp.component.html',
  styleUrls: ['./pop-up-modif-mdp.component.css']
})
export class PopUpModifMdpComponent {

  user: any;

  constructor(private http: HttpClient, private route: Router, private dialog: MatDialog, public authService: AuthService) { }

  modifMdp(val: any) {
    this.http.put('http://localhost:8300/user/password/' + this.authService.getUserConnect().idUser, val).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => { console.log(err) },

    })
  }

  goToProfil() {
    this.dialog.closeAll()
  }

}
