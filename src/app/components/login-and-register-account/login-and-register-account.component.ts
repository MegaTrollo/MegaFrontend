import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginOrRegisterAccountModel} from '../../models/LoginOrRegisterAccountModel';
import {LoginAndRegisterService} from '../../services/login-and-register.service';
import {AuthorizationModel} from '../../models/AuthorizationModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-and-register-account',
  templateUrl: './login-and-register-account.component.html',
  styleUrls: ['./login-and-register-account.component.css']
})
export class LoginAndRegisterAccountComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginOrRegisterModel: LoginOrRegisterAccountModel;
  authorizationModel: AuthorizationModel;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private loginAndRegisterService: LoginAndRegisterService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginEmail: [null, Validators.required],
      loginPassword: [null, Validators.required]
    });

    this.registerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  logIn() {
    if (this.loginForm.valid) {
      this.loginOrRegisterModel = new LoginOrRegisterAccountModel();
      this.loginOrRegisterModel.email = this.loginForm.controls.loginEmail.value;
      this.loginOrRegisterModel.password = this.loginForm.controls.loginPassword.value;

      this.loginAndRegisterService.login(this.loginOrRegisterModel).subscribe(value => {
        this.authorizationModel = value as AuthorizationModel;
        sessionStorage.setItem('jwtToken', this.authorizationModel.jwtToken);
        sessionStorage.setItem('accountId', this.authorizationModel.accountId);
        sessionStorage.setItem('roleId', this.authorizationModel.roleId);
        this.router.navigate(['/list-of-boards']);
        this.toastr.success('Zalogowano pomyślnie!');
      }, error1 => {
        this.toastr.error(error1.error.message);
      });
    } else {
      this.toastr.error('Popraw dane w formularzu!');
    }
  }

  registerAccount() {
    if (this.registerForm.valid) {
      this.loginOrRegisterModel = new LoginOrRegisterAccountModel();
      this.loginOrRegisterModel.email = this.registerForm.controls.email.value;
      this.loginOrRegisterModel.password = this.registerForm.controls.password.value;
      this.loginOrRegisterModel.firstName = this.registerForm.controls.firstName.value;
      this.loginOrRegisterModel.lastName = this.registerForm.controls.lastName.value;

      this.loginAndRegisterService.registerAccount(this.loginOrRegisterModel).subscribe(() => {
        this.toastr.success('Pomyślnie utworzono nowe konto!');
      }, error1 => {
        this.toastr.error(error1.error.message);
      });
    } else {
      this.toastr.error('Poprawe dane w formularzu!');
    }
  }
}
