import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { Envio_Limite_ObjetivoI } from 'src/app/interfaces/envio_limite_objetivo';
import { LimitesService } from 'src/app/servicios/limites.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-dialog-eliminar-limite',
  templateUrl: './dialog-eliminar-limite.component.html',
  styleUrls: ['./dialog-eliminar-limite.component.css']
})
export class DialogEliminarLimiteComponent{


  constructor(
    private usuario_service: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEliminarLimiteComponent>,
    public limite_service: LimitesService,
    private _snackBar: MatSnackBar ) {}




  onNoClick(): void {
    this.dialogRef.close();
  }


  eliminarLimite(): void{
    
    this.limite_service.deleteLimite(this.data.id).pipe(finalize(()=> this.dialogRef.close())).subscribe(data =>{
      console.log(data);
      this._snackBar.open("Limite eliminado exitosamente", "Cerrar" ,{duration: 5000});
    });

      
     
      
  }
  
}





