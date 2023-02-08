import { AuthenticationService } from '../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  error: string = '';
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private toastr: ToastrService
  ) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  submitRegForm(registerForm: FormGroup) {
    this._AuthenticationService
      .register(registerForm.value)
      .subscribe((response) => {
        if (registerForm.valid) {
          if (response.status == 'success') {
            localStorage.setItem('userEmail', response.user.email);
            this.registerForm.reset();
            this._Router.navigate(['/login']);
            this.toastr.success(response.message, '', {
              positionClass: 'toast-top-right',
              timeOut: 2500,
            });
          } else {
            this.error = response.message.email;
            this.toastr.error(`${this.error}!`, '', {
              positionClass: 'toast-top-right',
              timeOut: 2500,
            });
          }
        }
      });
  }

  ngOnInit(): void {}
}
