import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login';
import { ResponseI } from '../modelos/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiLoginService implements HttpInterceptor {

  
  

  url:string="http://127.0.0.1:8000/api/";
  



  constructor(protected http: HttpClient) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtén el token de autenticación del almacenamiento local o de donde lo tengas
    const authToken = localStorage.getItem('authToken');

    // Clona la solicitud original y agrega el token al encabezado de autorización
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${authToken}`,
        },
      });
    }

    // Continúa con la solicitud
    return next.handle(req);
  }

  loginEmail(form: LoginI):Observable<ResponseI>{
    let direccion = this.url + "login";
    return this.http.post<ResponseI>(direccion, form);
  }


}
