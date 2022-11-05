import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
declare var $:any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  isLogin: boolean = false;
  isToggle: boolean = false;

  constructor(private _AuthService:AuthenticationService) { }

  showCollapse() {
    $('button').next('.collapse').slideToggle(300);
    this.isToggle = true;
  }

  hideCollapse() {
    $('.collapse').fadeOut(300);
    this.isToggle = false;
  }
  logout(){
    this._AuthService.logout();
  }
  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

}
