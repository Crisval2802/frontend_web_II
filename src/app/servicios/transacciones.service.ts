import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login';
import { ResponseI } from '../modelos/response';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { TransaccionI } from '../modelos/transaccion';
import { ResponseTranI } from '../modelos/response_tran';
import { EnvioTransaccionI } from '../modelos/envio_transaccion';
import { ResponseTranSemanaI } from '../modelos/response_tran_semana';

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

  //Get ingresos

  getIngresosDia(clave: string | null, categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/dia/Ingreso/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }


  getIngresosSemana(clave: string | null, categoria: string|null):Observable<ResponseTranSemanaI>{
    let direccion = this.url + "transacciones/semana/Ingreso/"+categoria+"/" + clave;
    return this.http.get<ResponseTranSemanaI>(direccion);
  }

  getIngresosMes(clave: string | null, categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/mes/Ingreso/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  getIngresosYear(clave: string | null, categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/year/Ingreso/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  getIngresosRango(clave: string | null, categoria: string|null, inicio: string|undefined, final: string|undefined):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/rango/Ingreso/"+categoria+"/" + inicio + "/" + final + "/"+ clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  //Get gastos

  getGastosDia(clave: string | null,  categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/dia/Gasto/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }
  getGastosSemana(clave: string | null, categoria: string|null):Observable<ResponseTranSemanaI>{
    let direccion = this.url + "transacciones/semana/Gasto/"+categoria+"/" + clave;
    return this.http.get<ResponseTranSemanaI>(direccion);
  }
  getGastosMes(clave: string | null, categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/mes/Gasto/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  getGastosYear(clave: string | null, categoria: string|null):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/year/Gasto/"+categoria+"/" + clave;
    return this.http.get<ResponseTranI>(direccion);
  }

  getGastosRango(clave: string | null, categoria: string|null, inicio: string|undefined, final: string|undefined):Observable<ResponseTranI>{
    let direccion = this.url + "transacciones/rango/Gasto/"+categoria+"/" + inicio + "/" + final + "/"+ clave;
    return this.http.get<ResponseTranI>(direccion);
  }



  //Post transaccion
  postTransaccion(form: EnvioTransaccionI):Observable<ResponseI>{
    let direccion = this.url + "crear/transaccion/";
    return this.http.post<ResponseI>(direccion, form);
  }

  //Reportes de ingreso

  getReporteIngresosDia(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/dia/Ingreso/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteIngresosSemana(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/semana/Ingreso/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteIngresosMes(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/mes/Ingreso/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteIngresosYear(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/year/Ingreso/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteIngresosRango(clave: string | null, categoria: string|null, inicio: string|undefined, final: string|undefined){
    let direccion = this.url + "reporte/rango/Ingreso/"+categoria+"/" + inicio + "/" + final + "/"+ clave;
    console.log(direccion);
    return this.http.get(direccion,{responseType:'blob'});
  }

  //Reportes de gasto

  getReporteGastosDia(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/dia/Gasto/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteGastosSemana(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/semana/Gasto/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }


  getReporteGastosMes(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/mes/Gasto/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteGastosYear(clave: string | null, categoria: string|null){
    let direccion = this.url + "reporte/year/Gasto/"+categoria+"/" + clave;

    return this.http.get(direccion,{responseType:'blob'});
  }

  getReporteGastosRango(clave: string | null, categoria: string|null, inicio: string|undefined, final: string|undefined){
    let direccion = this.url + "reporte/rango/Gasto/"+categoria+"/" + inicio + "/" + final + "/"+ clave;
    console.log(direccion);
    return this.http.get(direccion,{responseType:'blob'});
  }
  
}


