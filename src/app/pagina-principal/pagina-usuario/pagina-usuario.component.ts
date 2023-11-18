import { Component, OnInit } from '@angular/core';
import { BarraSuperiorComponent } from '../barra-superior/barra-superior.component';
import { DivisaI } from 'src/app/interfaces/divisas';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';
import { Cambiar_UsuarioI } from 'src/app/interfaces/cambiar_usuario';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css']
})



export class PaginaUsuarioComponent implements OnInit {
  
  constructor(private usuario_service: UsuarioService,
            private router: Router,
            private _snackBar: MatSnackBar){}


  nombre_vacio:boolean=false;
  contras_no_coinciden:boolean=false;
  contra_invalida:boolean=false;

  nombre: string | undefined;
  correo: string | undefined;
  balance: number | undefined;
  divisa_pipe: string | undefined;
  divisa: string | undefined;
  contra: string | undefined;
  contra2: string | undefined;

  divisas: DivisaI[]=[
    {clave:'MXN',nombre:"Peso Mexicano",},
    {clave:'USD',nombre:"Dolar Estadounidense",},
    {clave:'CAD',nombre:"Dolar canadiense",},
    {clave:'ARS',nombre:"Peso Argentino",},
    {clave:'UYU',nombre:"Peso Uruguayo",},
    {clave:'CLP',nombre:"Peso Chileno",},
    {clave:'COP',nombre:"Peso Colombiano",},
    {clave:'BRL',nombre:"Real brasileño",},
    {clave:'EUR',nombre:"Euro",},
    {clave:'GBO',nombre:"Libra esterlina",},
    {clave:'JPY',nombre:"Yen Japones",},
  ];


  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }

    this.obtenerDatos(localStorage.getItem('id'));


  }

  obtenerDatos(id: string|null){
    this.usuario_service.getDatos(id).subscribe(data =>{
      this.balance=data.balance;
      this.nombre=data.nombre;
      this.correo=data.correo;
      this.divisa=data.divisa;
      this.divisa_pipe= data.divisa;
    });
  }

  cambiar_nombre(aux: string | undefined){

    //Validar nombre
    if(aux==""){
      this.nombre_vacio=true;
    }else{
      this.nombre_vacio=false;
      let form:Cambiar_UsuarioI = {nombre:aux ?? '', contra:'', divisa:''};
      this.usuario_service.cambiarDatos(localStorage.getItem('id'), form).subscribe(data =>{
        localStorage.setItem('nombre', aux ?? '');
        this._snackBar.open("Nombre actualizado exitosamente", "Cerrar" ,{duration: 5000});
      });


      //console.log(form);
    }


  }


  cambiar_divisa(aux: string | undefined){
    let form:Cambiar_UsuarioI ={nombre:'', contra:'', divisa:aux ?? ''};
    //console.log(form);
    this.usuario_service.cambiarDatos(localStorage.getItem('id'), form).pipe (finalize(()=> this.obtenerDatos(localStorage.getItem('id')))).subscribe(data =>{
      localStorage.setItem('divisa', aux ?? '');

      this._snackBar.open("Divisa Actualizada exitosamente", "Cerrar" ,{duration: 5000});

      console.log(data);
    });




  }

  cambiar_contra(aux: string | undefined, aux2: string | undefined){

    var CONTRA_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let errores: boolean = false;

    //Validar contra
    if (!(aux ?? '').match(CONTRA_REGEX)){
      this.contra_invalida= true;
      errores=true;
    }else{
      this.contra_invalida= false;
    }

    if(aux2!=aux){
      this.contras_no_coinciden=true;
      errores=true;
    }else{
      this.contras_no_coinciden=false;
    }

    if (errores==false){
      let form:Cambiar_UsuarioI = {nombre:'', contra:aux ?? '', divisa:''};

      this.usuario_service.cambiarDatos(localStorage.getItem('id'), form).subscribe(data =>{
        this.contra='';
        this.contra2='';

        this._snackBar.open("Contraseña Actualizada exitosamente", "Cerrar" ,{duration: 5000});
      });
      //console.log(form);


      
    }
 
  }


}
