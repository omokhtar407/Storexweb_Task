import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail:string = '';

  constructor(private _AuthenticationService:AuthenticationService ,
    private _Router:Router ,
    private toastr: ToastrService,
    private _NgxSpinnerService: NgxSpinnerService
  ) { }

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
    ])
  });


  submitLogForm(loginForm : FormGroup){
    this._AuthenticationService.login(loginForm.value).subscribe((response) => {
      if (loginForm.valid) {

        if (response.status == 'success') {
          localStorage.setItem('userToken', response.authorisation.token);
          this._AuthenticationService.saveUserData();
          this.loginForm.reset();
          this._Router.navigate(['movies']);
          this.toastr.success('Login Success', '', {
            positionClass: 'toast-top-right',
            timeOut: 2500,
          });
        }
      }
    },(error : any)=>{
      this.toastr.error(' please, enter correct password ', '', {
        positionClass: 'toast-top-right',
        timeOut: 2500,
      });
    });
  }

  ngOnInit(): void {

    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
    }, 1000);
  }

}
