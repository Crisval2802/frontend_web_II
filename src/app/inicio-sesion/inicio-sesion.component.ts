import { Component, OnInit } from '@angular/core';
import { ApiLoginService } from '../servicios/api-login.service';
import { LoginI } from '../interfaces/login';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit{

  constructor(private api_service: ApiLoginService, private router: Router){}

  inicio_incorrecto:boolean=false;

  loginForm = new FormGroup({
    correo: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    if (localStorage.getItem('authToken')){
      this.router.navigate(['inicio'])
    }
  }


  onLogin(form:LoginI | any){
    
    this.api_service.loginEmail(form).subscribe(data =>{
      
      if (data.message=="Inicio Incorrecto"){ 
        this.inicio_incorrecto=true;
      }else{
        localStorage.setItem('authToken', data.token)
        localStorage.setItem('correo', data.correo)
        localStorage.setItem('nombre', data.nombre)
        localStorage.setItem('divisa', data.divisa)
        localStorage.setItem('id', data.id)
        this.router.navigate(['inicio']);
        this.inicio_incorrecto=false;
      }
      
        
    });
  }

  irRegistro(){
    this.router.navigate(['login']);
    this.router.navigate(['registro']);
  }


}
