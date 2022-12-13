import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  visibleCoach = false;
  visibleAvatar = false;
  visibleTokens = false;

  showHideCoach() {
    if (this.visibleCoach == false) {
      this.visibleCoach = true;
    } else {
      this.visibleCoach = false;
    }
  }

  showHideAvatar() {
    if (this.visibleAvatar == false) {
      this.visibleAvatar = true;
    } else {
      this.visibleAvatar = false;
    }
  }


  showHideTokens() {
    if (this.visibleTokens == false) {
      this.visibleTokens = true;
    } else {
      this.visibleTokens = false;
    }
  }



}
