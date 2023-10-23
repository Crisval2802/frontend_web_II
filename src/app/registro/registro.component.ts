import { Component } from '@angular/core';
import { DivisaI } from '../modelos/divisas';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistroI } from '../modelos/form_registro';
import { ApiLoginService } from '../servicios/api-login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent{

  nombre_vacio:boolean=false;
  correo_invalido:boolean=false;
  contra_invalida:boolean=false;
  divisa_vacia:boolean=false;



  constructor(private api_service: ApiLoginService, 
          private router: Router,
          private _snackBar: MatSnackBar){}

  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    contra: new FormControl('', Validators.required),
    divisa: new FormControl('', Validators.required)
  })
  
  

  divisas: DivisaI[]=[
    {clave:'mxn',nombre:"Peso Mexicano",},
    {clave:'usd',nombre:"Dolar Estadounidense",},
    {clave:'cad',nombre:"Dolar canadiense",},
    {clave:'ars',nombre:"Peso Argentino",},
    {clave:'uyu',nombre:"Peso Uruguayo",},
    {clave:'clp',nombre:"Peso Chileno",},
    {clave:'cop',nombre:"Peso Colombiano",},
    {clave:'brl',nombre:"Real brasileño",},
    {clave:'eur',nombre:"Euro",},
    {clave:'gbp',nombre:"Libra esterlina",},
    {clave:'jpy',nombre:"Yen Japones",},
  ];


  registrarse(form:RegistroI | any){
    //Validacion de inputs
    var errores: boolean=false;
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    var CONTRA_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    //Validar nombre
    if(form.nombre==""){
      this.nombre_vacio=true;
      errores=true;
    }else{
      this.nombre_vacio=false;
    }


    //Validar correo
    if (!(form.correo).match(EMAIL_REGEX)){
      this.correo_invalido= true;
      errores=true;
    }else{
      this.correo_invalido= false;
    }
    
    //Validar contra
    if (!(form.contra).match(CONTRA_REGEX)){
      this.contra_invalida= true;
      errores=true;
    }else{
      this.contra_invalida= false;
    }

    console.log(form.divisa);
    //Validar divisa
    if (form.divisa==""){
      this.divisa_vacia=true;
      errores=true;
    }else{
      this.divisa_vacia=false;
    }

    if (errores==false){
      this.api_service.enviarRegistro(form).subscribe(data =>{
      
        console.log(data);
        
        if (data.message=="Exito"){
          this._snackBar.open("Registro Exitoso", "Cerrar" ,{duration: 5000});
          this.router.navigate(['login']);
        }else{
          this._snackBar.open("Error, ya existe un registro con ese correo", "Cerrar" ,{duration: 5000});
        }
          
      });
    }
  }
}
