import { Injectable } from '@angular/core';

import { ResponseI } from '../interfaces/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';

import { EnvioTransferenciaI } from '../interfaces/envio_transferencia';
import { ResponseTransferI } from '../interfaces/response_transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService implements HttpInterceptor{


 url:string="https://crisval.pythonanywhere.com/api/";
 //url:string="http://localhost:8000/api/";

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





  postTransferencia(form: EnvioTransferenciaI):Observable<ResponseI>{
    let direccion = this.url + "transferencias/";
    return this.http.post<ResponseI>(direccion, form);
  }

  getTransferencias(id: number|undefined):Observable<ResponseTransferI>{
    let direccion = this.url + "transferencias/cuenta/" + id;
    return this.http.get<ResponseTransferI>(direccion);
  }

}
