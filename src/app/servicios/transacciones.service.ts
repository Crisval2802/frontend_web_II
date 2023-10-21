import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login';
import { ResponseI } from '../modelos/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { TransaccionI } from '../modelos/transaccion';
import { ResponseTranI } from '../modelos/response_tran';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService implements HttpInterceptor{

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

  getIngresosDia(clave: string | null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/dia/Ingreso/0/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  getGastosDia(clave: string | null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/dia/Gasto/0/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

}


