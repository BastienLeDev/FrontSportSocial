import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {



  constructor(private http: HttpClient, private route: Router) { }

  goToConnexion() {
    this.route.navigateByUrl('connexion');
  }

  inscription(val: any) {
    this.http.post('http://localhost:8300/user/save', val).subscribe({})

  }

}
