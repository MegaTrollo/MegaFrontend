import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (sessionStorage.getItem('jwtToken') == undefined) {
      req = req.clone({
          setHeaders: {
            ContentType: 'application/json',
            AccessControlAllowMethods: 'POST, GET, OPTIONS, PUT, DELETE',
            AccessControlAllowOrigin: '*',
            AccessControlAllowHeaders: 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
            AccessControlAllowCredentials: 'true'
          }
        }
      );
      return next.handle(req);
    } else {
      req = req.clone({
          setHeaders: {
            ContentType: 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
            AccessControlAllowMethods: 'POST, GET, OPTIONS, PUT, DELETE',
            AccessControlAllowOrigin: '*',
            AccessControlAllowHeaders: 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent',
            AccessControlAllowCredentials: 'true'
          }
        }
      );
      return next.handle(req);
    }
  }
}
