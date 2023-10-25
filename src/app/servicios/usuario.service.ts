import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login';
import { ResponseI } from '../modelos/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { TransaccionI } from '../modelos/transaccion';
import { ResponseTranI } from '../modelos/response_tran';
import { BalanceI } from '../modelos/balance';
import { CuentaI } from '../modelos/cuentas';
import { ResponseCuentaI } from '../modelos/response_cuenta';
import { ResponseCategoriaI } from '../modelos/response_cat';
import { ResponseSubcategoriaI } from '../modelos/response_sub';
import { ResponseUsuarioI } from '../modelos/response_usuario';
import { Cambiar_UsuarioI } from '../modelos/cambiar_usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

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
