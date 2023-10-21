import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {Dialog_TransaccionI} from '../../modelos/Dialog_Transaccion'
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CuentaI } from 'src/app/modelos/cuentas';
import { CategoriaI } from 'src/app/modelos/categorias';
import { SubcategoriaI } from 'src/app/modelos/subcategorias';


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



  constructor(
    private usuario_service: UsuarioService,
    public dialogRef: MatDialogRef<DialogoTransaccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dialog_TransaccionI,
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



  obtenerCuentas(id: string | null){
    this.usuario_service.getCuentas(id).subscribe(data =>{
        this.cuentas = data.cuentas;
        console.log(this.cuentas);
    });
  }

  obtenerCategoriasGasto(id: string | null){
    this.usuario_service.getCategoriasGasto(id).subscribe(data =>{
        this.categorias_gasto = data.Categorias;
        console.log(this.categorias_gasto);
    });
  }

  obtenerCategoriasIngreso(id: string | null){
    this.usuario_service.getCategoriasIngreso(id).subscribe(data =>{
        this.categorias_ingreso = data.Categorias;
        console.log(this.categorias_ingreso);
    });
  }

  obtenerSubcategorias(id: string | null){
    this.usuario_service.getSubcategorias(id).subscribe(data =>{
        this.subcategorias = data.Subcategorias;
        console.log(this.subcategorias);
    });
  }

}
