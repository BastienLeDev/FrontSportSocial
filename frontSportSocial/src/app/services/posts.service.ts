import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  setPostToDelete(val: any) {
    localStorage.setItem('postToDelete', JSON.stringify(val));
  }

  getPostToDelete() {
    let club: any = localStorage.getItem('postToDelete');
    return JSON.parse(club);
  }
}
