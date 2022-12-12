import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubComponent } from './club/club.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FriendComponent } from './friend/friend.component';
import { HomeComponent } from './home/home.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { MapComponent } from './map/map.component';
import { ProfilComponent } from './profil/profil.component';
import { RankingComponent } from './ranking/ranking.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'friend', component: FriendComponent },
  { path: 'map', component: MapComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'club', component: ClubComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
