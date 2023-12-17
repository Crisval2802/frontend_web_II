import { Injectable } from '@angular/core';

import { ResponseI } from '../interfaces/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';

import { BalanceI } from '../interfaces/balance';

import { ResponseCuentaI } from '../interfaces/response_cuenta';
import { ResponseCategoriaI } from '../interfaces/response_cat';
import { ResponseSubcategoriaI } from '../interfaces/response_sub';
import { ResponseUsuarioI } from '../interfaces/response_usuario';
import { Cambiar_UsuarioI } from '../interfaces/cambiar_usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


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

  getBalance(clave: string | null):Observable<BalanceI>{
    let direccion = this.url + "obtener/balance/" + clave;
    return this.http.get<BalanceI>(direccion);
  }


  getCuentas(clave: string | null):Observable<ResponseCuentaI>{
    let direccion = this.url + "cuentas/usuario/" + clave;
    return this.http.get<ResponseCuentaI>(direccion);
  }

  getCategorias(clave: string | null):Observable<ResponseCategoriaI>{
    let direccion = this.url + "categorias/usuario/" + clave;
    return this.http.get<ResponseCategoriaI>(direccion);
  }

  getCategoriasIngreso(clave: string | null):Observable<ResponseCategoriaI>{
    let direccion = this.url + "categorias/usuario/ingreso/" + clave;
    return this.http.get<ResponseCategoriaI>(direccion);
  }

  getCategoriasGasto(clave: string | null):Observable<ResponseCategoriaI>{
    let direccion = this.url + "categorias/usuario/gasto/" + clave;
    return this.http.get<ResponseCategoriaI>(direccion);
  }


  getSubcategorias(clave: string | null):Observable<ResponseSubcategoriaI>{
    let direccion = this.url + "subcategorias/usuario/" + clave;
    return this.http.get<ResponseSubcategoriaI>(direccion);
  }

  getDatos(clave: string | null):Observable<ResponseUsuarioI>{
    let direccion = this.url + "obtener/informacion/usuario/" + clave;
    return this.http.get<ResponseUsuarioI>(direccion);
  }


  cambiarDatos(clave: string | null , form: Cambiar_UsuarioI):Observable<ResponseI>{
    let direccion = this.url + "usuarios/" + clave;
    return this.http.put<ResponseI>(direccion, form);
  }

}
