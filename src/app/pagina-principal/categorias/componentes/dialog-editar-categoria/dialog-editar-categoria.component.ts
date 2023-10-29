import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Envio_CategoriaI } from 'src/app/modelos/envio_categoria';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-dialog-editar-categoria',
  templateUrl: './dialog-editar-categoria.component.html',
  styleUrls: ['./dialog-editar-categoria.component.css']
})
export class DialogEditarCategoriaComponent {
  nombre_error:boolean=false;

  
  categoriaForm = new FormGroup({
    nombre: new FormControl('', Validators.required)

  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private categoria_service: CategoriasService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  putCategoria(form:Envio_CategoriaI | any): void{
    

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
      this.categoria_service.putCategoria(form, this.data.id_categoria).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        this._snackBar.open("Categoria editada exitosamente", "Cerrar" ,{duration: 5000});
      });
    }
  
  }
}
