import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor() { }

  setClubToQuit(val: any) {
    localStorage.setItem('clubToQuit', JSON.stringify(val));
  }

  getClubToQuit() {
    let club: any = localStorage.getItem('clubToQuit');
    return JSON.parse(club);
  }


}
