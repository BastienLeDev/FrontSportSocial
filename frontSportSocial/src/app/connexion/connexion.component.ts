import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  user: any;
  msgErr = '';

  /*
  constructor(private http: HttpClient, private route: Router) { }



  connexion(val: any) {
    this.http.post('http://localhost:8300/user', val).subscribe({
      next: (data) => {
        this.user = data;
        if (this.user != null) {

          this.route.navigateByUrl('');
        } else {
          this.msgErr = 'Identifiant ou mot de passe incorrect'
        }
      }
      error: (err) => { console.log(err) },

    })
  }
*/
}
