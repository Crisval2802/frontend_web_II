import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Limites_ObjetivosI } from 'src/app/interfaces/Limites_Objetivos';
import { LimitesService } from 'src/app/servicios/limites.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogCrearLimiteComponent } from './componentes/dialog-crear-limite/dialog-crear-limite.component';
import { DialogEliminarLimiteComponent } from './componentes/dialog-eliminar-limite/dialog-eliminar-limite.component';

@Component({
  selector: 'app-limites',
  templateUrl: './limites.component.html',
  styleUrls: ['./limites.component.css']
})
export class LimitesComponent implements OnInit{



  divisa = localStorage.getItem('divisa');

  constructor (private router: Router,
    private limites_service: LimitesService,
    public dialog: MatDialog){}


  limites: Limites_ObjetivosI[] | undefined;

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }else{
      this.obtenerLimites((localStorage.getItem('id')));


    }
  }


  obtenerLimites(id: string | null){
    this.limites_service.getLimites(id).subscribe(data =>{
      this.limites=data.datos;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCrearLimiteComponent, {
      data: {},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerLimites(localStorage.getItem('id'));
    });
  }

  openDialogEliminar(id: number | null): void {
    const dialogRef = this.dialog.open(DialogEliminarLimiteComponent, {
      data:{
        id:id,
      }
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerLimites(localStorage.getItem('id'));
    });
  }


}
