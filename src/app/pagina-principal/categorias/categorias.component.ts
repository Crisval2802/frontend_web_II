import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoriaI } from 'src/app/interfaces/categorias';

import { SubcategoriaI } from 'src/app/interfaces/subcategorias';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DialogEditarCategoriaComponent } from './componentes/dialog-editar-categoria/dialog-editar-categoria.component';
import { DialogEditarSubcategoriaComponent } from './componentes/dialog-editar-subcategoria/dialog-editar-subcategoria.component';
import { DialogCrearCategoriaComponent } from './componentes/dialog-crear-categoria/dialog-crear-categoria.component';
import { DialogCrearSubcategoriaComponent } from './componentes/dialog-crear-subcategoria/dialog-crear-subcategoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit{
  
  categorias_gasto: CategoriaI[] | undefined;
  categorias_ingreso: CategoriaI[] | undefined;
  subcategorias: SubcategoriaI[] | undefined;

  divisa = localStorage.getItem('divisa');

  constructor (private router: Router,
              private usuario_service: UsuarioService,
              private dialog: MatDialog,){}
              
  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }else{
      this.obtenerCategoriasGasto(localStorage.getItem('id'));
      this.obtenerCategoriasIngreso(localStorage.getItem('id'));
      this.obtenerSubcategorias(localStorage.getItem('id'));
    }

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


  openDialogEditarCategoria(id:number | undefined): void {
    const dialogRef = this.dialog.open(DialogEditarCategoriaComponent, {
      data:{
        id_categoria:id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCategoriasGasto(localStorage.getItem('id'));
      this.obtenerCategoriasIngreso(localStorage.getItem('id'));

      
    });
  }


  openDialogEditarSubcategoria(id:number | undefined): void {
    const dialogRef = this.dialog.open(DialogEditarSubcategoriaComponent, {
      data:{
        id_subcategoria:id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.obtenerSubcategorias(localStorage.getItem('id'));
      
    });
  }

  openDialogCrearCategoria(): void {
    const dialogRef = this.dialog.open(DialogCrearCategoriaComponent, {
      
    });

    dialogRef.afterClosed().subscribe(result => {

      this.obtenerCategoriasGasto(localStorage.getItem('id'));
      
      this.obtenerCategoriasIngreso(localStorage.getItem('id'));
      
    });
  }


  openDialogCrearSubcategoria(id:number | undefined, tipo:string|undefined): void {
    const dialogRef = this.dialog.open(DialogCrearSubcategoriaComponent, {
      data:{
        id_categoria:id,
        tipo:tipo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.obtenerSubcategorias(localStorage.getItem('id'));
      
    });
  }
}
