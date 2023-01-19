import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent {

  constructor(private http: HttpClient, private route: Router, public dialogRef: MatDialogRef<NewActivityComponent>, public authService: AuthService ) { }

  sports: any;


  ngOnInit(): void {
    this.listSport();
  }

  createActivity(val: any) {
    this.http.post('http://localhost:8300/schedule/' + this.authService.getUserConnect().idUser, val).subscribe({
      next: (data) => {
      },
      error: (err) => { console.log(err) },
    });
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  addEventToUser(idEvent: bigint) {
    this.http.patch('http://localhost:8300/event/participer/' + this.authService.getUserConnect().idUser + '/' + idEvent, null).subscribe({
      next: (data) => { this.ngOnInit },
      error: (err) => { console.log(err) },
    });
  }
  */



}
