import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Envio_CategoriaI } from 'src/app/modelos/envio_categoria';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-dialog-crear-subcategoria',
  templateUrl: './dialog-crear-subcategoria.component.html',
  styleUrls: ['./dialog-crear-subcategoria.component.css']
})
export class DialogCrearSubcategoriaComponent {
  nombre_error:boolean=false;

  
  subcategoriaForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    clave_categoria: new FormControl('', Validators.required),
    
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCrearSubcategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoria_service: CategoriasService,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarSubcategoria(form:Envio_CategoriaI | any): void{
    

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

      form.clave_categoria=this.data.id_categoria;

      form.tipo=this.data.tipo;

      this.categoria_service.postSubcategoria(form).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{

        this._snackBar.open("Subcategoria creada exitosamente", "Cerrar" ,{duration: 5000});
      });
    }
  
  }
}
