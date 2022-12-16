import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  constructor(private http: HttpClient, private route: Router,
    public dialogRef: MatDialogRef<NewEventComponent>
  ) { }

  sports: any;

  ngOnInit(): void {
    this.listSport();
  }

  createEvent(val: any) {
    console.log(val)
    this.http.post('http://localhost:8300/event/create', val).subscribe({
      error: (err) => { console.log(err) },
    });
    window.location.reload();
  }

  listSport() {
    this.http.get('http://localhost:8300/sport').subscribe({
      next: (data) => { this.sports = data },
      error: (err) => { console.log(err); }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
