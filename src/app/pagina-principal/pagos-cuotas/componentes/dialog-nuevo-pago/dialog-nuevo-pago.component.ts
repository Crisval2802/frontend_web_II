import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Dialog_TransaccionI } from 'src/app/interfaces/Dialog_Transaccion';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { CuentaI } from 'src/app/interfaces/cuentas';
import { EnvioTransaccionI } from 'src/app/interfaces/envio_transaccion';
import { EnvioTransaccionCuotasI } from 'src/app/interfaces/envio_transaccion_cuotas';
import { SubcategoriaI } from 'src/app/interfaces/subcategorias';
import { DialogoTransaccionComponent } from 'src/app/pagina-principal/inicio/componentes/dialogo-transaccion/dialogo-transaccion.component';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-dialog-nuevo-pago',
  templateUrl: './dialog-nuevo-pago.component.html',
  styleUrls: ['./dialog-nuevo-pago.component.css']
})
export class DialogNuevoPagoComponent {
  selectedNav: string= "Gasto";
  categoria_elegida_gasto: number = 0;
  categoria_elegida_ingreso: number = 0;

  cuentas: CuentaI[] | undefined;
  categorias_gasto: CategoriaI[] | undefined;
  categorias_ingreso: CategoriaI[] | undefined;
  subcategorias: SubcategoriaI[] | undefined;


  cantidad_error:boolean=false;
  cantidad_pagos_error:boolean=false;
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
    cantidad_pagos: new FormControl(File, Validators.required)
  })

  constructor(
    private usuario_service: UsuarioService,
    public dialogRef: MatDialogRef<DialogNuevoPagoComponent>,
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

  enviarTransaccion(form:EnvioTransaccionCuotasI | any): void{
    

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

    if (form.categoria_gasto==''){
      this.categoria_error=true;
      errores=true;
    }else{
      this.categoria_error=false;  
    }
    
    //validacion de cantidad
    if (form.cantidad<=0){
      this.cantidad_error=true;
      errores=true;
    }else{
      this.cantidad_error=false;
    }

    //validacion de cantidad
    if (form.cantidad_pagos<2 || form.cantidad_pagos>24){
      this.cantidad_pagos_error=true;
      errores=true;
    }else{
      this.cantidad_pagos_error=false;
    }


   
    
    form.divisa=localStorage.getItem('divisa');

    const formData = new FormData();

    formData.append('tipo', "Gasto");
    formData.append('categoria_gasto', form.categoria_gasto.toString());
    formData.append('categoria_ingreso', form.categoria_ingreso.toString());
    formData.append('subcategoria_gasto', form.subcategoria_gasto.toString());
    formData.append('subcategoria_ingreso', form.subcategoria_ingreso.toString());
    formData.append('cuenta', form.cuenta.toString());
    formData.append('cantidad', form.cantidad.toString());
    formData.append('comentarios', form.comentarios);
    formData.append('divisa', form.divisa);
    formData.append('cantidad_pagos', form.cantidad_pagos)

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

   // Función para generar un rango de números
   range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
  }

}
