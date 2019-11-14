import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login-and-register-account',
  templateUrl: './login-and-register-account.component.html',
  styleUrls: ['./login-and-register-account.component.css']
})
export class LoginAndRegisterAccountComponent implements OnInit {

  constructor(private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  logIn() {

  }

  registerAccount() {

  }
}
