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
    this.darkTheme();
  }

    darkTheme() {
    if (!this.appComponent.classToggled) {
      this.classToggled = this.classToggled; 
    }
    else 
    {
      this.classToggled = !this.classToggled; 
    }
  }
 


  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }
}
