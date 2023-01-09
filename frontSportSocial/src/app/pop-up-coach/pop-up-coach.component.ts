import { Component, OnInit } from '@angular/core';
import { CoachService } from '../services/coach.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pop-up-coach',
  templateUrl: './pop-up-coach.component.html',
  styleUrls: ['./pop-up-coach.component.css']
})
export class PopUpCoachComponent implements OnInit {

  constructor(private CoachService: CoachService, private http: HttpClient) { };

  coach = this.CoachService.getCoachToSee();
  coachSport: any;
  allCoach: any;
  imageSport: any = [];
  sports: any = [];

  ngOnInit(): void {
    this.getUserSport(this.coach.idUser)
  }

  getUserSport(val : any){
    this.http.get('http://localhost:8300/classement/me/'+ val).subscribe({
      next: (data) => {
        this.allCoach = data;
        this.allCoach.forEach((s: any) => {this.sports.push(s.sport.nameSport)});
        this.allCoach.forEach((i: any) => {this.imageSport.push(i.sport)})
        console.log(this.sports)
      },
      error: (err) => { console.log(err); }
    })
  }

}
