import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuentaI } from 'src/app/interfaces/cuentas';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DialogCrearCuentaComponent } from './componentes/dialog-crear-cuenta/dialog-crear-cuenta.component';
import { DialogEditarCuentaComponent } from './componentes/dialog-editar-cuenta/dialog-editar-cuenta.component';
import { DialogCrearTransferenciaComponent } from './componentes/dialog-crear-transferencia/dialog-crear-transferencia.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogVerTransferenciasComponent } from './componentes/dialog-ver-transferencias/dialog-ver-transferencias.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})




export class CuentasComponent implements OnInit{

  constructor(private usuario_service: UsuarioService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private router: Router ){}
  
  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }

    this.obtenerCuentas(localStorage.getItem('id'));
  }

  cuentas: CuentaI[] | undefined;
  
  // cuentas: CuentaI[]=[
  //   {
  //     clave:1,
  //     nombre: "cuenta1",
  //     balance:10,
  //     divisa:"USD"
  //   },

  //   {
  //     clave:2,
  //     nombre: "cuenta2",
  //     balance:20,
  //     divisa:"USD"
  //   }
  // ];



  obtenerCuentas(id: string | null){
    this.usuario_service.getCuentas(id).subscribe(data =>{
        this.cuentas = data.cuentas;

    });
  }



  openDialogCrearCuenta(): void {
    const dialogRef = this.dialog.open(DialogCrearCuentaComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCuentas(localStorage.getItem('id'));
      
    });
  }

  openDialogEditarCuenta(id:number | undefined): void {
    const dialogRef = this.dialog.open(DialogEditarCuentaComponent, {
      data:{
        id_cuenta:id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCuentas(localStorage.getItem('id'));
      
    });
  }

  openDialogVerTransferencias(id:number | undefined): void {
    const dialogRef = this.dialog.open(DialogVerTransferenciasComponent, {
      data:{
        id_cuenta:id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCuentas(localStorage.getItem('id'));
      
    });
  }

  openDialogCrearTransferencia(): void {
    const dialogRef = this.dialog.open(DialogCrearTransferenciaComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCuentas(localStorage.getItem('id'));
    });
  }
}
