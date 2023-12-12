import { Injectable } from '@angular/core';

import { ResponseI } from '../interfaces/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ResponseLimObjI } from '../interfaces/response_Lim-Obj';
import { Envio_Limite_ObjetivoI } from '../interfaces/envio_limite_objetivo';



@Injectable({
  providedIn: 'root'
})
export class LimitesService implements HttpInterceptor{


  //url:string="https://crisval.pythonanywhere.com/api/";
  url:string="http://localhost:8000/api/";


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



  getLimites(clave: string | null):Observable<ResponseLimObjI>{
    let direccion = this.url + "limites/usuario/" + clave;
    return this.http.get<ResponseLimObjI>(direccion);
  }

  postLimite(form: Envio_Limite_ObjetivoI):Observable<ResponseI>{
    let direccion = this.url + "limites/";
    return this.http.post<ResponseI>(direccion, form);
  }

  deleteLimite(id: string | null):Observable<ResponseI>{
    let direccion = this.url + "limites/" + id;

    return this.http.delete<ResponseI>(direccion);
  }
}
