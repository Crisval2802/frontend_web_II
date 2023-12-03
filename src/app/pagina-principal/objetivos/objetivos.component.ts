import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogCrearObjetivoComponent } from './componentes/dialog-crear-objetivo/dialog-crear-objetivo.component';
import { MatDialog } from '@angular/material/dialog';
import { ObjetivosService } from 'src/app/servicios/objetivos.service';
import { Limites_ObjetivosI } from 'src/app/interfaces/Limites_Objetivos';
import { DialogEliminarObjetivoComponent } from './componentes/dialog-eliminar-objetivo/dialog-eliminar-objetivo.component';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit{
  
  divisa = localStorage.getItem('divisa');

  constructor (private router: Router,
    private objetivos_service: ObjetivosService,
    public dialog: MatDialog){}


  objetivos: Limites_ObjetivosI[] | undefined;

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }else{
      this.obtenerObjetivos((localStorage.getItem('id')));


    }
  }


  obtenerObjetivos(id: string | null){
    this.objetivos_service.getObjetivos(id).subscribe(data =>{
      this.objetivos=data.datos;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCrearObjetivoComponent, {
      data: {},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerObjetivos(localStorage.getItem('id'));
    });
  }


    
  openDialogEliminar(id: number | null): void {
    const dialogRef = this.dialog.open(DialogEliminarObjetivoComponent, {
      data:{
        id:id,
      }
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerObjetivos(localStorage.getItem('id'));
    });
  }

}
