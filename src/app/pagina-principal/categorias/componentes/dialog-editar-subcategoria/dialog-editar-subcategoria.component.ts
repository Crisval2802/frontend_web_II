import { Component, Inject } from '@angular/core';
import { Envio_CategoriaI } from 'src/app/interfaces/envio_categoria';
import { DialogEditarCategoriaComponent } from '../dialog-editar-categoria/dialog-editar-categoria.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog-editar-subcategoria',
  templateUrl: './dialog-editar-subcategoria.component.html',
  styleUrls: ['./dialog-editar-subcategoria.component.css']
})
export class DialogEditarSubcategoriaComponent {
  nombre_error:boolean=false;

  
  subcategoriaForm = new FormGroup({
    nombre: new FormControl('', Validators.required)

  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditarSubcategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private categoria_service: CategoriasService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  putSubcategoria(form:Envio_CategoriaI | any): void{
    

    //Validacion de los campos del dialogo
    var errores: boolean=false;
    //validacion del nombre
    if (form.nombre==''){
      this.nombre_error=true;

      errores=true;
    }else{
      this.nombre_error=false;
    }
    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      this.categoria_service.putSubcategoria(form, this.data.id_subcategoria).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        this._snackBar.open("Subcategoria editada exitosamente", "Cerrar" ,{duration: 5000});
      });
    }
  }
}
