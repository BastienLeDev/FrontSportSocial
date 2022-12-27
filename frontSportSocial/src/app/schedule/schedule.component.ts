import { AppComponent } from '../app.component';
import { Component, OnInit } from '@angular/core';

import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from 'angular-calendar';
import { endOfDay, startOfDay } from 'date-fns';

import { PopUpScheduleComponent } from '../pop-up-schedule/pop-up-schedule.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],


})




export class ScheduleComponent implements OnInit {

  constructor(private http: HttpClient, public authService: AuthService, private route: Router, private dialog: MatDialog, private appComponent : AppComponent) { }

  schedules: any;
  start: any;
  end: any;
  title:  any;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  classToggled : boolean = false;

  ngOnInit(): void {
    this.listSchedule()
    if (this.appComponent.classToggled) {
      this.darkTheme();
    }
  }

    darkTheme() {
      this.classToggled = true; 

  }
 

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
      end: endOfDay(new Date()),
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

  addEvent(): void {
    
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }


}

