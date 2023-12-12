import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('correo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('divisa');
    localStorage.removeItem('id');
    this.router.navigate(['login']);
    
  }

  irUsuario(){
    this.router.navigate(['usuario']);
  }

  irCuentas(){
    this.router.navigate(['cuentas']);
  }

  irCuotas(){
    this.router.navigate(['cuotas']);
  }


  irCategorias(){
    this.router.navigate(['categorias']);
  }

  irInicio(){
    this.router.navigate(['inicio']);
  }

  irHistorial(){
    this.router.navigate(['historial']);
  }

  irLimites(){
    this.router.navigate(['limites']);
  }

  irObjetivos(){
    this.router.navigate(['objetivos']);
  }
}
