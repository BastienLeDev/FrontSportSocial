import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DarkThemeService } from '../services/dark-theme.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  score: any;
  texte = "";
  sports: any;
  sporta: any;
  selectedSport: any;
  position = 0;
  individu: any;
  classToggled = this.dark.classToggled;

  constructor(private http: HttpClient, private route: Router, private authService: AuthService, private appComponent : AppComponent, public dark : DarkThemeService) { }

  ngOnInit(): void {

    this.ListSport();
    this.ListSportIndividu();
  }




  goToShop() {
    this.route.navigateByUrl('shop');
  }
  ListSport() {


    this.http.get('http://localhost:8300/sport').subscribe({

      next: (dataa) => {
        this.sports = dataa
        console.log(this.sports)
      },
      error: (err) => { console.log(err); }
    });
  }

  ListSportIndividu() {
    this.http.get('http://localhost:8300/classement/me/' + this.authService.getUserConnect().idUser).subscribe({
      next: (dataaa) => {
        this.individu = dataaa
        console.log(this.sports)
      },
      error: (err) => { console.log(err); }
    });
  }

  ListRankingdesc(val: any) {

    this.sporta = val;
    console.log(val);
    console.log(this.sporta);
    console.log(val);
    //this.http.get('http://localhost:8300/classement/Swimming/desc').subscribe({

    this.http.get('http://localhost:8300/classement/' + this.sporta.sports.nameSport + '/desc').subscribe({

      next: (data) => {
        this.score = data
        console.log(this.score)
      },
      error: (err) => { console.log(err); }
    });
  }

}
