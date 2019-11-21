import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  jwtToken = sessionStorage.getItem('jwtToken');
  constructor( private router: Router) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login-register-account']);
  }
}
