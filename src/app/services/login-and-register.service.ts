import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginOrRegisterAccountModel} from '../models/LoginOrRegisterAccountModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  constructor(private http: HttpClient) { }

  login(loginModel: LoginOrRegisterAccountModel) {
    return this.http.post(`${environment.backendUrl}/api/auth/signin`, loginModel);
  }

  registerAccount(registerAccountModel: LoginOrRegisterAccountModel) {
    return this.http.post(`${environment.backendUrl}/api/auth/signup`, registerAccountModel);
  }
}
