import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

  user: any;
  isChecked = true;

  constructor(private http: HttpClient, private route: Router) { }

  goToConnexion() {
    this.route.navigateByUrl('connexion');
  }

  inscription(val: any) {
    console.log(val)
    if (this.isChecked == true) {
      val.coachUser = true;
      this.http.post('http://localhost:8300/user/save', val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('connexion');
        },
        error: (err) => { console.log(err) },

      })

    } else {
      val.coachUser = false;
      this.http.post('http://localhost:8300/user/save', val).subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.route.navigateByUrl('connexion');
        },
        error: (err) => { console.log(err) },

      })
    }
  }




}