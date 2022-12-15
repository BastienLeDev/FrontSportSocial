import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{

  events : any;
  event : any;
  sports : any;

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.listEventToCome();
    this.listSport();
  }



  createEvent(val: any) {
    console.log(val)
    this.http.post('http://localhost:8300/event/create', val).subscribe({
      error: (err) => { console.log(err) },
    });
  }

  listEventToCome(){
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => { this.events = data },
      error: (err) => { console.log(err); }
    });
  }

  listSport(){
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

}
