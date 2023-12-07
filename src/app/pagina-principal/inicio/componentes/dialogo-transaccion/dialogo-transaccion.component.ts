import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Dialog_TransaccionI} from '../../../../interfaces/Dialog_Transaccion'
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CuentaI } from 'src/app/interfaces/cuentas';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { SubcategoriaI } from 'src/app/interfaces/subcategorias';
import { EnvioTransaccionI } from 'src/app/interfaces/envio_transaccion';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { finalize } from 'rxjs';
import { TransferenciasService } from 'src/app/servicios/transferencias.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialogo-transaccion',
  templateUrl: './dialogo-transaccion.component.html',
  styleUrls: ['./dialogo-transaccion.component.css'],

})
export class DialogoTransaccionComponent implements OnInit{
  selectedNav: string= "Gasto";
  categoria_elegida_gasto: number = 0;
  categoria_elegida_ingreso: number = 0;

  cuentas: CuentaI[] | undefined;
  categorias_gasto: CategoriaI[] | undefined;
  categorias_ingreso: CategoriaI[] | undefined;
  subcategorias: SubcategoriaI[] | undefined;


  cantidad_error:boolean=false;
  cuenta_error:boolean=false;
  categoria_error:boolean=false;

  archivoSeleccionado: File | null = null;

  transaccionForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    categoria_gasto: new FormControl('', Validators.required),
    categoria_ingreso: new FormControl('', Validators.required),
    subcategoria_gasto: new FormControl('', Validators.required),
    subcategoria_ingreso: new FormControl('', Validators.required),
    cuenta: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.required),
    imagen: new FormControl(File, Validators.required),
  })

  constructor(
    private usuario_service: UsuarioService,
    public dialogRef: MatDialogRef<DialogoTransaccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog_TransaccionI,
    private transaccion_service: TransaccionesService,
    private _snackBar: MatSnackBar

  ) {}
  ngOnInit(): void {
    this.obtenerCuentas(localStorage.getItem('id'));
    this.obtenerCategoriasGasto(localStorage.getItem('id'));
    this.obtenerCategoriasIngreso(localStorage.getItem('id'));
    this.obtenerSubcategorias(localStorage.getItem('id'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarTransaccion(form:EnvioTransaccionI | any): void{
    

    //Validacion de los campos del dialogo
    var errores: boolean=false;
    //validacion de cuenta
    if (form.cuenta==''){
      this.cuenta_error=true;

      errores=true;
    }else{
      this.cuenta_error=false;
    }
    //validacion de categoria
    if (form.tipo=='Gasto'){
      if (form.categoria_gasto==''){
        this.categoria_error=true;
        errores=true;
      }else{
        this.categoria_error=false;  
      }
    }else{
      if (form.categoria_ingreso==''){
        this.categoria_error=true;
        errores=true;
      }else{
        this.categoria_error=false;  
      }
    }
    //validacion de cantidad
    if (form.cantidad<=0){
      this.cantidad_error=true;
      errores=true;
    }else{
      this.cantidad_error=false;
    }


   
    
    form.divisa=localStorage.getItem('divisa');

    const formData = new FormData();

    formData.append('tipo', form.tipo);
    formData.append('categoria_gasto', form.categoria_gasto.toString());
    formData.append('categoria_ingreso', form.categoria_ingreso.toString());
    formData.append('subcategoria_gasto', form.subcategoria_gasto.toString());
    formData.append('subcategoria_ingreso', form.subcategoria_ingreso.toString());
    formData.append('cuenta', form.cuenta.toString());
    formData.append('cantidad', form.cantidad.toString());
    formData.append('comentarios', form.comentarios);
    formData.append('divisa', form.divisa);

    if (this.archivoSeleccionado){
      formData.append('imagen', this.archivoSeleccionado, this.archivoSeleccionado.name);
    }



    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      form.divisa=localStorage.getItem('divisa');
      this.transaccion_service.postTransaccion(formData).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        console.log(data);
        this._snackBar.open("Transaccion agreagada exitosamente", "Cerrar" ,{duration: 5000});
      });

     
      
    }
  
  }


  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  obtenerCuentas(id: string | null){
    this.usuario_service.getCuentas(id).subscribe(data =>{
        this.cuentas = data.cuentas;

    });
  }

  obtenerCategoriasGasto(id: string | null){
    this.usuario_service.getCategoriasGasto(id).subscribe(data =>{
        this.categorias_gasto = data.Categorias;
  
    });
  }

  obtenerCategoriasIngreso(id: string | null){
    this.usuario_service.getCategoriasIngreso(id).subscribe(data =>{
        this.categorias_ingreso = data.Categorias;

    });
  }

  obtenerSubcategorias(id: string | null){
    this.usuario_service.getSubcategorias(id).subscribe(data =>{
        this.subcategorias = data.Subcategorias;

    });
  }

}
