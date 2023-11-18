import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Envio_CategoriaI } from 'src/app/interfaces/envio_categoria';
import { DialogEditarCuentaComponent } from 'src/app/pagina-principal/cuentas/componentes/dialog-editar-cuenta/dialog-editar-cuenta.component';
import { CategoriasService } from 'src/app/servicios/categorias.service';


@Component({
  selector: 'app-dialog-crear-categoria',
  templateUrl: './dialog-crear-categoria.component.html',
  styleUrls: ['./dialog-crear-categoria.component.css']
})
export class DialogCrearCategoriaComponent {
  nombre_error:boolean=false;
  tipo_error:boolean=false

  
  categoriaForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    
  });

  constructor(
    public dialogRef: MatDialogRef<DialogCrearCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoria_service: CategoriasService,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarCategoria(form:Envio_CategoriaI | any): void{
    

    //Validacion de los campos del dialogo
    var errores: boolean=false;
    //validacion del nombre
    if (form.nombre==''){
      this.nombre_error=true;

      errores=true;
    }else{
      this.nombre_error=false;
    }



    if(form.tipo==''){
      this.tipo_error=true;
      errores=true;
    }else{
      this.nombre_error=false;
    }
    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{

      form.clave_usuario=(localStorage.getItem('id'));
      this.categoria_service.postCategoria(form).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{

        this._snackBar.open("Categoria creada exitosamente", "Cerrar" ,{duration: 5000});
      });
    }
  
  }
}
