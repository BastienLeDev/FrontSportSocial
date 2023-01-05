import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../services/clubs.service';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  constructor(private clubService: ClubsService) { };

  idClub = this.clubService.getClubToSee().idClub;
  club = this.clubService.getClubToSee();

  ngOnInit(): void {

  }



}
