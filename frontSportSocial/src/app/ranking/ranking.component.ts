import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  score: any;
  texte = "";
  sports: any;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.ListRankingdesc(null);
    this.ListSport();
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

  ListRankingdesc(val: any) {
    //this.http.get('http://localhost:8300/classement/Swimming/desc').subscribe({

    this.http.get('http://localhost:8300/classement/' + val + '/desc').subscribe({

      next: (data) => {
        this.score = data
        console.log(this.score)
      },
      error: (err) => { console.log(err); }
    });
  }
}
