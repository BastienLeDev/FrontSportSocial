



import { Component } from '@angular/core';

import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';

import { PopUpScheduleComponent } from '../pop-up-schedule/pop-up-schedule.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';




@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],


})



export class ScheduleComponent {

  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog) { }

  schedules: any;

  viewDate: Date = new Date();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  setView(view: CalendarView) {
    this.view = view;
  }

  events: CalendarEvent[] = [
    {

      start: new Date(2022, 2, 8, 0),
      end: new Date(2022, 2, 18, 0),
      title: 'appointment_date',
    },
    {
      start: startOfDay(new Date()),
      title: 'Second event',
    }
  ]


  listSchedule() {
    this.http.get('http://localhost:8300/schedule/').subscribe({
      next: (data) => {
        this.schedules = data
      },
      error: (err) => { console.log(err); }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    //let x=this.adminService.dateFormat(date)
    //this.openAppointmentList(x)
  }

  openModifDonneesPersosModal() {
    const dialogRef = this.dialog.open(PopUpScheduleComponent)
  }


}

