import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    if (!this.authService.isConnected()) {
      this.route.navigateByUrl('connexion')
    }
  }
}
