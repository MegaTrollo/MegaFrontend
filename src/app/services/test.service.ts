import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private url = '/api';
  private headersObject: HttpHeaders;

  private prepareHeader() {

    this.headersObject = new HttpHeaders();
    this.headersObject.append('Access-Control-Allow-Origin', '*');
    this.headersObject.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    this.headersObject.append('Content-Type', 'application/json');
  }

  constructor(private  http: HttpClient) { }

  getTestValue(): Observable<any> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.get<any>(this.url + '/test', requestOptions);
  }
}
