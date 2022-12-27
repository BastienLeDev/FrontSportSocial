import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  sports: any;
  classToggled : boolean = false;

  constructor(private http: HttpClient, private authService: AuthService, private route: Router, private appComponent : AppComponent) { }

  ngOnInit(): void {
    this.listSport();
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
    if (this.appComponent.classToggled) {
      this.darkTheme();
    }
  }

    darkTheme() {
      this.classToggled = true; 

  }
 


  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }
}
