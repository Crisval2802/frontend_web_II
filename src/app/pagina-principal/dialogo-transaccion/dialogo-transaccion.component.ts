import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Dialog_TransaccionI} from '../../modelos/Dialog_Transaccion'
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CuentaI } from 'src/app/modelos/cuentas';
import { CategoriaI } from 'src/app/modelos/categorias';
import { SubcategoriaI } from 'src/app/modelos/subcategorias';
import { EnvioTransaccionI } from 'src/app/modelos/envio_transaccion';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { finalize } from 'rxjs';


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



  transaccionForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    categoria_gasto: new FormControl('', Validators.required),
    categoria_ingreso: new FormControl('', Validators.required),
    subcategoria_gasto: new FormControl('', Validators.required),
    subcategoria_ingreso: new FormControl('', Validators.required),
    cuenta: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.required)
  })

  constructor(
    private usuario_service: UsuarioService,
    public dialogRef: MatDialogRef<DialogoTransaccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog_TransaccionI,
    private transaccion_service: TransaccionesService,
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

    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      form.divisa=localStorage.getItem('divisa');
      this.transaccion_service.postTransaccion(form).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
         
      });

     
      
    }
  
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
