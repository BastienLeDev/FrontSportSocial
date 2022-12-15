

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FriendComponent } from './friend/friend.component';
import { MapComponent } from './map/map.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProfilComponent } from './profil/profil.component';
import { ShopComponent } from './shop/shop.component';
import { RankingComponent } from './ranking/ranking.component';
import { ClubComponent } from './club/club.component';
import { EventComponent } from './event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopUpProfilComponent } from './pop-up-profil/pop-up-profil.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NewEventComponent } from './new-event/new-event.component';
import { PopUpModifMdpComponent } from './pop-up-modif-mdp/pop-up-modif-mdp.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    HomeComponent,
    InscriptionComponent,
    FriendComponent,
    MapComponent,
    ScheduleComponent,
    ProfilComponent,
    ShopComponent,
    RankingComponent,
    ClubComponent,
    EventComponent,
    PopUpProfilComponent,
    NewEventComponent,
    PopUpModifMdpComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
