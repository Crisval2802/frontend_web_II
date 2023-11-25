import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseI } from '../interfaces/response';
import { Envio_CategoriaI } from '../interfaces/envio_categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url:string="https://crisval.pythonanywhere.com/api/";
  


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





  postCategoria(form: Envio_CategoriaI):Observable<ResponseI>{
    let direccion = this.url + "categorias/";
    return this.http.post<ResponseI>(direccion, form);
  }

  postSubcategoria(form: Envio_CategoriaI):Observable<ResponseI>{
    let direccion = this.url + "subcategorias/";
    return this.http.post<ResponseI>(direccion, form);
  }

  putCategoria(form: Envio_CategoriaI, id: number|undefined):Observable<ResponseI>{
    let direccion = this.url + "categorias/" + id;
    return this.http.put<ResponseI>(direccion, form);
  }

  putSubcategoria(form: Envio_CategoriaI, id: number|undefined):Observable<ResponseI>{
    let direccion = this.url + "subcategorias/" + id;
    return this.http.put<ResponseI>(direccion, form);
  }
}
