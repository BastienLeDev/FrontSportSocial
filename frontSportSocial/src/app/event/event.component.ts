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

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit(): void {
    this.listEventToCome();
  }



  createEvent(val: any) {
    this.http.post('http://localhost:8300/event/create', val).subscribe({
      next:(data)=>{
        this.event = data;
        console.log(this.event);
      },
      error: (err) => { console.log(err) },
    })

  }

  listEventToCome(){
    this.http.get('http://localhost:8300/event/tocome').subscribe({
      next: (data) => { this.events = data },
      error: (err) => { console.log(err); }
    });
  }

}
