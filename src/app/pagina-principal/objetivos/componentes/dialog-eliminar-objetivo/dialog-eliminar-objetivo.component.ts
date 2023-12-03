import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { Envio_Limite_ObjetivoI } from 'src/app/interfaces/envio_limite_objetivo';
import { LimitesService } from 'src/app/servicios/limites.service';
import { ObjetivosService } from 'src/app/servicios/objetivos.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-dialog-eliminar-objetivo',
  templateUrl: './dialog-eliminar-objetivo.component.html',
  styleUrls: ['./dialog-eliminar-objetivo.component.css']
})
export class DialogEliminarObjetivoComponent{


  constructor(
    private usuario_service: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEliminarObjetivoComponent>,
    public objetivo_service: ObjetivosService,
    private _snackBar: MatSnackBar ) {}




  onNoClick(): void {
    this.dialogRef.close();
  }


  eliminarObjetivo(): void{
    
    this.objetivo_service.deleteObjetivo(this.data.id).pipe(finalize(()=> this.dialogRef.close())).subscribe(data =>{
      this._snackBar.open("Objetivo eliminado exitosamente", "Cerrar" ,{duration: 5000});
    });

      
     
      
  }
  
}





