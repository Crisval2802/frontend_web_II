import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { Envio_Limite_ObjetivoI } from 'src/app/interfaces/envio_limite_objetivo';
import { LimitesService } from 'src/app/servicios/limites.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-dialog-crear-limite',
  templateUrl: './dialog-crear-limite.component.html',
  styleUrls: ['./dialog-crear-limite.component.css']
})
export class DialogCrearLimiteComponent implements OnInit{
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
  
  cantidad_error:boolean=false;
  categoria_error:boolean=false;
  categorias_gasto: CategoriaI[] | undefined;

  limiteForm = new FormGroup({
    asignado: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    fecha_limite: new FormControl('', Validators.required),
    divisa: new FormControl('', Validators.required)
    
  })

  constructor(
    private usuario_service: UsuarioService,
    public dialogRef: MatDialogRef<DialogCrearLimiteComponent>,
    public limite_service: LimitesService,
    private _snackBar: MatSnackBar

    

  ) {

    
  }



  ngOnInit(): void {
    this.limiteForm.get('fecha_limite')?.setValue(this.fecha);
    this.obtenerCategoriasGasto(localStorage.getItem("id"));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarLimite(form:Envio_Limite_ObjetivoI | any): void{
    
    //Validacion de los campos del dialogo
    var errores: boolean=false;
    
    //validacion de cantidad
    if (form.asignado<=0){
      this.cantidad_error=true;
      errores=true;
    }else{
      this.cantidad_error=false;
    }

    //validacion de la categoria
    if (form.categoria==''){
      this.categoria_error=true;
      errores=true;
    }else{
      this.categoria_error=false;  
    }

    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      form.divisa=localStorage.getItem('divisa');
      form.clave_usuario=localStorage.getItem("id");
      this.limite_service.postLimite(form).pipe(finalize(()=> this.dialogRef.close())).subscribe(data =>{
        console.log(data);
        this._snackBar.open("Limite agregado exitosamente", "Cerrar" ,{duration: 5000});
      });

     
      
    }
  
  }


  obtenerCategoriasGasto(id: string | null){
    this.usuario_service.getCategoriasGasto(id).subscribe(data =>{
        this.categorias_gasto = data.Categorias;
  
    });
  }

}
