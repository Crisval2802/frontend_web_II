import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLimObjI } from '../interfaces/response_Lim-Obj';
import { ResponseI } from '../interfaces/response';
import { Envio_Limite_ObjetivoI } from '../interfaces/envio_limite_objetivo';

@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {

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



  getObjetivos(clave: string | null):Observable<ResponseLimObjI>{
    let direccion = this.url + "objetivos/usuario/" + clave;
    return this.http.get<ResponseLimObjI>(direccion);
  }

  postObjetivo(form: Envio_Limite_ObjetivoI):Observable<ResponseI>{
    let direccion = this.url + "objetivos/";
    return this.http.post<ResponseI>(direccion, form);
  }
}
