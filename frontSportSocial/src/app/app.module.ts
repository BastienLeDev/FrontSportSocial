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
    EventComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
