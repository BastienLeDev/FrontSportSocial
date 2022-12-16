import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css']
})
export class PopUpMessageComponent {

  mess : any;
  name: any;

  constructor (private http : HttpClient, public authService: AuthService) {}



  ngOnInit() : void {}

  sendMess(val : any,) {
    this.name = val;

    let messag = {contentMessage: val.message};
    let messagerie = {message: messag};
  
    this.http.post('http://localhost:8300/message/envoyer/' + this.name.message.expediteurMessage.idUser +'/' +  this.authService.getUserConnect().idUser , messagerie).subscribe({
      next: (data) => {
        this.mess = data;
        this.ngOnInit();
      },
      error: (err) => { console.log(err) },
  
    })

}
}
